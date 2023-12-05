# Imports
from typing import Union
from fastapi import FastAPI

# Initialize API
app = FastAPI()

# Define Routes
@app.get("/")
def read_root():
    return {"Hello": "World"}