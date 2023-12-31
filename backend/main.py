from fastapi import FastAPI, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from openai_api import whisper
from middlewares import cors
import os 
import asyncio
import json



# Define root path in app directory for static file serving.
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

def generator(url):
    # Download Video from 'pytube' and analyze title category
    yield json.dumps({ "status": "Downloading" })
    result = whisper.download_video(url)
    
    # #If title is related to BJJ, Transcribe video. 
    if result["sentiment"] == "True":
        yield json.dumps({ "status": "Transcribing" })
        transcript = whisper.transcribe_video()
        yield json.dumps({ "status": "Summarizing" })
        summary = whisper.summarize_video(transcript)
        yield json.dumps({ "status": "Complete", "title": result["title"], "summary": summary, "id": result["video_id"] })
    else: 
        error_message = f"Sorry, {result['title']} doesn't appear to be a BJJ instructional video."
        yield json.dumps({"error": error_message })

# Define API Routes
@api_app.get("/predict")
async def predict(url: str):
    return StreamingResponse(generator(url), media_type="application/json")