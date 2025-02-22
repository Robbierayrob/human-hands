# config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    IMAGE_FOLDER = os.path.join('static', 'images')
    # Add other configuration settings as needed