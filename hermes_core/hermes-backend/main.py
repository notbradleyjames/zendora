import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import asyncio

app = FastAPI(title="Zendora Hermes Command Center API")

# Allow requests from our frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace "*" with the frontend's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

manager = ConnectionManager()

@app.get("/")
def read_root():
    return {"status": "Hermes Backend is Operational"}

@app.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Received message from client: {data}")
            
            # Simulated Hermes logic processing
            await asyncio.sleep(1) # simulate thinking
            
            mock_response = f"**Hermes:** Acknowledged. You said: '{data}'. Operations are nominal."
            await manager.send_personal_message(mock_response, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("Client disconnected.")

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_location, "wb") as file_object:
            # Read in chunks to handle large files
            while chunk := await file.read(1024 * 1024):
                file_object.write(chunk)
        return JSONResponse(status_code=200, content={"message": "File uploaded successfully", "filename": file.filename})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
