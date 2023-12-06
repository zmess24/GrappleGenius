from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from openai_api import whisper

templates = Jinja2Templates(directory='homepage-app')

# Initialize FastAPI Instances
app = FastAPI(title="frontend-app")
api_app = FastAPI(title="backend-api")

# Mount Applications
app.mount("/api", api_app)
app.mount("/", StaticFiles(directory="public", html=True), name="public") 

# Middlewares
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define API Routes
@api_app.get("/predict")
async def predict():
    whisper.download_video()
    result = whisper.transcribe_video()
    return {"message": result }

