from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.models import ReportRequest, VoiceSosRequest, IncidentResponse
from app.services.ai_service import analyze_incident_multimodal
from app.services.allocation import allocate_resources
from app.services.sos_dispatch import process_voice_sos
import uuid
import base64
import json
import os

router = APIRouter()

DB_FILE = "civic_db.json"

def get_db():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            return json.load(f)
    return {}

def save_db(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)

@router.post("/incidents/report", response_model=IncidentResponse)
async def report_incident(request: ReportRequest, background_tasks: BackgroundTasks):
    print("Received Report Request...")
    
    # 1. Decode media if needed
    img_bytes = None
    audio_bytes = None
    try:
        if request.image_base64:
            img_bytes = base64.b64decode(request.image_base64)
        if request.audio_base64:
            audio_bytes = base64.b64decode(request.audio_base64)
    except Exception as e:
        print(f"Warning: Corrupted base64 payload. Continuing without media. Error: {e}")
    
    # 2. AI Multimodal Analysis
    analysis_result = analyze_incident_multimodal(
        text_description=request.text_description or "",
        image_bytes=img_bytes,
        audio_bytes=audio_bytes
    )
    
    incident_id = f"inc_{uuid.uuid4().hex[:8]}"
    
    db = get_db()
    db[incident_id] = {
        "id": incident_id,
        "status": "ANALYZED",
        "severity": analysis_result.triage_label,
        "incident_type": analysis_result.incident_type,
        "location": request.location.dict()
    }
    
    # 3. Trigger Allocation Engine in background
    allocation_res = allocate_resources(
        incident_lat=request.location.lat,
        incident_lng=request.location.lng,
        severity_label=analysis_result.triage_label,
        required_resource=analysis_result.recommended_response_type
    )
    
    # Update state
    if allocation_res.get("status") == "DISPATCHED":
        db[incident_id].update({
            "status": "DISPATCHED",
            "assigned_ambulance": allocation_res["ambulance"]["id"],
            "assigned_hospital": allocation_res["hospital"]["id"]
        })
    else:
        db[incident_id]["status"] = "ESCALATED"
        
    save_db(db)

    return db[incident_id]

@router.post("/sos/voice")
async def trigger_sos_voice(request: VoiceSosRequest):
    result = process_voice_sos(
        audio_file_path="mock_audio",
        user_phone=request.user_phone,
        user_location=request.location.dict()
    )
    return result

@router.get("/incidents/active")
async def get_active_incidents():
    db = get_db()
    return list(db.values())
