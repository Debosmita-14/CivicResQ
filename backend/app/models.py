from pydantic import BaseModel, Field
from typing import Optional, List, Dict

class Location(BaseModel):
    lat: float
    lng: float
    address: Optional[str] = None

class ReportRequest(BaseModel):
    reporter_id: str
    location: Location
    text_description: Optional[str] = None
    image_base64: Optional[str] = None
    audio_base64: Optional[str] = None

class AssignResourceRequest(BaseModel):
    incident_id: str
    required_resource: str = "AMBULANCE_BLS"
    
class VoiceSosRequest(BaseModel):
    user_phone: str
    location: Location
    audio_base64: str

class IncidentResponse(BaseModel):
    id: str
    status: str
    severity: str
    incident_type: str
    assigned_ambulance: Optional[str] = None
    assigned_hospital: Optional[str] = None
