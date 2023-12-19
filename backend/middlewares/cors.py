from fastapi.middleware.cors import CORSMiddleware

def enable_cors(app):
    # Allow CORS calls from the following domains:
    origins = [
        "http://localhost",
        "http://localhost:8000",
        "http://localhost:3000",
        "https://grapplegenius-b0e1e8887b67.herokuapp.com/"
    ]

    # 
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


