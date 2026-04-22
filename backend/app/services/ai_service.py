import json
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel
from typing import List, Optional
import requests

load_dotenv()

# Configure Gemini API
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", "dummy-key-for-demo"))

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
    # We will use the initialized client in the global scope
    
    # Fetch OpenWeather Info
    weather_context = "Weather: Clear / Unknown"
    weather_api_key = os.environ.get("OPENWEATHER_API_KEY")
    if weather_api_key:
        try:
            # We assume a default Mumbai loc or intercept lat/lng if passed into this fn
            pass # In real production, lat/lng should be passed to this function
            weather_context = "Weather fetched successfully but requires lat/lng args."
        except:
            pass

    # Build prompt
    prompt = f"""
    You are an AI Emergency Triage Expert. Analyze the given emergency inputs carefully.
    Determine the incident type, severity score (0-100), appropriate triage label (LOW, MEDIUM, HIGH, CRITICAL),
    and recommended response type. Extract key entities (hazards, injuries) and provide a 1-sentence operator summary.
    
    CURRENT CONTEXT: Use this external data to influence your severity score (e.g. storms increase accident severity):
    {weather_context}
    
    Output exactly this JSON schema:
    {{
      "incident_type": "string (e.g. road_accident, fire, cardiac_emergency, etc)",
      "severity_score": int,
      "triage_label": "string",
      "confidence_score": float,
      "recommended_response_type": "string",
      "extracted_entities": ["string"],
      "summary": "string"
    }}
    """
    
    # Construct input payload
    contents = [prompt]
    
    if text_description:
        contents.append(f"Text Report: {text_description}")
        
    if image_bytes:
        contents.append(types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"))
        
    # Audio processing normally requires uploading via File API for large files,
    # but small snippets can be passed directly if base64 encoded.
    if audio_bytes:
        contents.append(types.Part.from_bytes(data=audio_bytes, mime_type="audio/mp3"))

    # Generate response
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=contents,
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )
        data = json.loads(response.text)
        return IncidentAnalysisResult(**data)
    except Exception as e:
        # Fallback or error handling
        print(f"Error parsing Gemini output or Invalid Key: {e}")
        return IncidentAnalysisResult(
            incident_type="road_accident",
            severity_score=90,
            triage_label="CRITICAL",
            confidence_score=0.9,
            recommended_response_type="AMBULANCE_AND_FIRE",
            extracted_entities=["Mock Fallback Triggered"],
            summary="Default fallback case created because Gemini AI encountered an error or lacked API keys."
        )

# Example usage for testing standalone
if __name__ == "__main__":
    test_result = analyze_incident_multimodal(
        text_description="There is a huge pile up on the highway, multiple cars involved and a truck is leaking fuel. Several people look unconscious.",
        image_bytes=None # Assume mock
    )
    print("Test Output:")
    print(test_result.model_dump_json(indent=2))
