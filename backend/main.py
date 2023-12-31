from fastapi import FastAPI, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
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

async def generator():
    for i in range(10):
        res = { "message": i }
        print(res)
        yield json.dumps(res)
        await asyncio.sleep(2)

# Define API Routes
@api_app.get("/predict")
async def predict(url: str):
    print(url)
    return StreamingResponse(generator(), media_type="application/x-ndjson")
    # Download Video from 'pytube' and analyze title category
    # result = whisper.download_video(link)
    # # If title is related to BJJ, Transcribe video. 
    # if result["sentiment"] == "True":
    #     summary = whisper.transcribe_video()
    #     return { "title": result["title"], "summary": summary, "id": result["video_id"] }
    # else: 
    #     error_message = f"Sorry, {result['title']} doesn't appear to be a BJJ instructional video."
    #     return {"error": error_message }