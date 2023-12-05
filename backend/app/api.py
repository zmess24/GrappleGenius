from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


# Initialize FastAPI
app = FastAPI()

# Add Middlewares
app.mount("/", StaticFiles(directory="static"), name="static")

# Define Routes
@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}