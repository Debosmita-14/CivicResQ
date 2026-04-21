import json
import os
import google.generativeai as genai
from pydantic import BaseModel
from typing import List, Optional

# Configure Gemini API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", "dummy-key-for-demo"))

class IncidentAnalysisResult(BaseModel):
    incident_type: str
    severity_score: int
    triage_label: str
    confidence_score: float
    recommended_response_type: str
    extracted_entities: List[str]
    summary: str

def analyze_incident_multimodal(text_description: str, image_bytes: Optional[bytes] = None, audio_bytes: Optional[bytes] = None) -> IncidentAnalysisResult:
    """
    1. Incident Analysis & 2. Severity Scoring
    Uses Gemini API to analyze an emergency report from text, image, and/or audio inputs
    and returns a structured JSON response containing the severity score and triage details.
    """
    
    # In a real scenario, use gemini-1.5-pro or gemini-2.5-pro for best multimodal understanding
    model = genai.GenerativeModel('gemini-1.5-pro', generation_config={"response_mime_type": "application/json"})
    
    # Build prompt
    prompt = """
    You are an AI Emergency Triage Expert. Analyze the given emergency inputs carefully.
    Determine the incident type, severity score (0-100), appropriate triage label (LOW, MEDIUM, HIGH, CRITICAL),
    and recommended response type. Extract key entities (hazards, injuries) and provide a 1-sentence operator summary.
    
    Output exactly this JSON schema:
    {
      "incident_type": "string (e.g. road_accident, fire, cardiac_emergency, etc)",
      "severity_score": int,
      "triage_label": "string",
      "confidence_score": float,
      "recommended_response_type": "string",
      "extracted_entities": ["string"],
      "summary": "string"
    }
    """
    
    # Construct input payload
    contents = [prompt]
    
    if text_description:
        contents.append(f"Text Report: {text_description}")
        
    if image_bytes:
        contents.append({
            "mime_type": "image/jpeg",
            "data": image_bytes
        })
        
    # Audio processing normally requires uploading via File API for large files,
    # but small snippets can be passed directly if base64 encoded.
    if audio_bytes:
        contents.append({
            "mime_type": "audio/mp3",
            "data": audio_bytes
        })

    # Generate response
    response = model.generate_content(contents)
    
    # Parse structured JSON output
    try:
        data = json.loads(response.text)
        return IncidentAnalysisResult(**data)
    except Exception as e:
        # Fallback or error handling
        print(f"Error parsing Gemini output: {e}")
        return IncidentAnalysisResult(
            incident_type="unknown",
            severity_score=50,
            triage_label="MEDIUM",
            confidence_score=0.1,
            recommended_response_type="POLICE",
            extracted_entities=["Parse Error"],
            summary="System failed to automatically parse the emergency intent."
        )

# Example usage for testing standalone
if __name__ == "__main__":
    test_result = analyze_incident_multimodal(
        text_description="There is a huge pile up on the highway, multiple cars involved and a truck is leaking fuel. Several people look unconscious.",
        image_bytes=None # Assume mock
    )
    print("Test Output:")
    print(test_result.model_dump_json(indent=2))
