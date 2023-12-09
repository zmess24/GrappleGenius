from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from openai_api import whisper
from middlewares import cors

from pydantic import BaseModel

templates = Jinja2Templates(directory='homepage-app')

# Initialize FastAPI Instances
app = FastAPI(title="frontend-app")
api_app = FastAPI(title="backend-api")

# Mount Applications
app.mount("/api", api_app)
app.mount("/", StaticFiles(directory="public", html=True), name="public") 

# Add Middlewares
cors.enable_cors(app)

class YouTubeLink(BaseModel):
    url: str

# Define API Routes
@api_app.post("/predict")
async def predict(link: YouTubeLink):
    # Download Video from 'pytube' and analyze title category
    result = whisper.download_video(link)
    # If title is related to BJJ, Transcribe video. 
    if result["sentiment"] == "True":
        summary = whisper.transcribe_video()
        return { "title": result["title"], "summary": summary, "id": result["video_id"] }
    else: 
        error_message = f"Sorry, {result['title']} doesn't appear to be a BJJ instructional video."
        return {"error": error_message }

