from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router

app = FastAPI(
    title="CivicResQ AI Emergency Response API",
    description="Real-time crisis management intelligence system",
    version="1.0.0"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def health_check():
    return {"status": "ok", "system": "CivicResQ Core Running"}

# Dummy websocket endpoint for live dashboard
connected_clients = set()

@app.websocket("/api/v1/ws/dispatch")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle incoming signals if necessary
    except Exception as e:
        connected_clients.remove(websocket)

async def broadcast_alert(message: str):
    for client in connected_clients:
        try:
            await client.send_text(message)
        except:
            pass
