from fastapi import FastAPI, Response
from fastapi.staticfiles import StaticFiles
from openai_api import whisper
from middlewares import cors
from pydantic import BaseModel
import os 
root = os.path.dirname(os.path.abspath(__file__))

# Initialize FastAPI Instances
app = FastAPI(title="frontend-app")
api_app = FastAPI(title="backend-api")

# Add Middlewares
cors.enable_cors(app)

# Mount API App
app.mount("/api", api_app)

# Define Static Routes
@app.get("/about")
async def main():
    with open(os.path.join(root, 'public/index.html')) as fh:
        data = fh.read()
    return Response(content=data, media_type="text/html")

@app.get("/summary/{video_id}")
async def main():
    with open(os.path.join(root, 'public/index.html')) as fh:
        data = fh.read()
    return Response(content=data, media_type="text/html")

app.mount("/", StaticFiles(directory="public", html=True), name="public") 

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