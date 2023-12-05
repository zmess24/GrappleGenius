from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# Initialize FastAPI's
app = FastAPI(title="frontend-app")
api = FastAPI(title="backend-api")

# Mount Applications
app.mount("/", StaticFiles(directory="public", html=True), name="public") 
app.mount("/api", api)

# Define API Routes
@api.get("/api/transcribe")
async def transcribe_video():
    print("Hello World")
    return {"message": "Hello World"}

