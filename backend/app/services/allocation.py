from typing import Dict, List, Optional
from math import radians, cos, sin, asin, sqrt

# Mock database structures for demonstration
MOCK_AMBULANCES = [
    {"id": "amb_1", "status": "AVAILABLE", "lat": 19.060, "lng": 72.855, "type": "AMBULANCE_BLS"},
    {"id": "amb_2", "status": "AVAILABLE", "lat": 19.080, "lng": 72.870, "type": "AMBULANCE_ALS"}
]

MOCK_HOSPITALS = [
    {"id": "hosp_1", "name": "City Trauma Center", "lat": 19.051, "lng": 72.825, "beds": 4, "has_trauma_unit": True},
    {"id": "hosp_2", "name": "General Clinic", "lat": 19.075, "lng": 72.880, "beds": 0, "has_trauma_unit": False}
]

def haversine(lon1, lat1, lon2, lat2):
    """Calculate the great circle distance in kilometers between two points on the earth."""
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # Radius of earth in kilometers
    return c * r

def determine_best_hospital(incident_lat: float, incident_lng: float, severity: str) -> Optional[Dict]:
    """
    4. Smart Resource Allocation Engine (Hospital selection)
    Finds the closest hospital with available beds and correct capability.
    """
    best_hospital = None
    min_distance = float('inf')
    
    for hosp in MOCK_HOSPITALS:
        if hosp["beds"] <= 0:
            continue
            
        # If severity is critical, must have trauma unit
        if severity == "CRITICAL" and not hosp.get("has_trauma_unit", False):
            continue
            
        dist = haversine(incident_lng, incident_lat, hosp["lng"], hosp["lat"])
        
        # Real-world: Check ETA via Google Maps Distance Matrix API here instead of straight-line distance
        # response = requests.get(f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={incident_lat},{incident_lng}&destinations={hosp['lat']},{hosp['lng']}&key=API_KEY")
        
        if dist < min_distance:
            min_distance = dist
            best_hospital = hosp
            
    return best_hospital

def assign_nearest_ambulance(incident_lat: float, incident_lng: float, required_type: str) -> Optional[Dict]:
    """
    3. Real-time Map and Routing Layer (Ambulance allocation)
    Finds the nearest available appropriate ambulance.
    """
    best_ambulance = None
    min_distance = float('inf')
    
    for amb in MOCK_AMBULANCES:
        if amb["status"] != "AVAILABLE":
            continue
            
        if required_type == "AMBULANCE_ALS" and amb["type"] != "AMBULANCE_ALS":
            # Advanced Life Support required but only BLS available
            continue
            
        dist = haversine(incident_lng, incident_lat, amb["lng"], amb["lat"])
        
        if dist < min_distance:
            min_distance = dist
            best_ambulance = amb
            
    return best_ambulance

def allocate_resources(incident_lat: float, incident_lng: float, severity_label: str, required_resource: str):
    """Master assignment controller"""
    print(f"Allocating resources for incident at ({incident_lat}, {incident_lng}) with severity {severity_label}")
    
    hospital = determine_best_hospital(incident_lat, incident_lng, severity_label)
    ambulance = assign_nearest_ambulance(incident_lat, incident_lng, required_resource)
    
    if hospital and ambulance:
        print(f"✅ Route Assigned: Ambulance {ambulance['id']} -> Incident -> Hospital {hospital['name']}")
        return {"ambulance": ambulance, "hospital": hospital, "status": "DISPATCHED"}
    else:
        print("❌ Escalation triggered: Resources unavailable!")
        return {"error": "Insufficient resources. Escalating to state disaster network.", "status": "ESCALATED"}

if __name__ == "__main__":
    allocate_resources(19.076, 72.877, "CRITICAL", "AMBULANCE_ALS")
