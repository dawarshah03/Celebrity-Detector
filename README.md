# Celebrity Face Detector

## Problem

People often see a photo of a celebrity and are unsure who it is. Searching manually can be time-consuming and inaccurate.

## Solution

This project is an AI-powered Celebrity Face Detector. It allows users to upload an image, and the system automatically identifies the celebrity.

## What Are We Finding

We are finding the name of the celebrity in the uploaded image.

## Backend

- Built with Flask and Flask-CORS for API communication.
- Uses Google Generative AI (Gemini) for analyzing images and detecting the celebrity.
- Reads images as base64, sends them to the model, and returns the celebrity name.

## Frontend

Built with React (Vite) and Tailwind CSS.
- Allows users to:
  - Upload or drag & drop an image.
  - Preview the uploaded image.
  - Analyze it with the backend API.
  - View results instantly.
- Includes sample celebrity images to test quickly.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS + Axios
- Backend: Flask (Python) + Flask-CORS + Dotenv
- AI Model: Google Gemini (generative vision model)

## How It Works

1. User uploads or drags an image into the web app.
2. The React frontend sends the image to the Flask backend.
3. Flask encodes the image and sends it to the Gemini AI model.
4. The model analyzes the face and predicts the celebrity’s name.
5. The result is returned to the user.

## Requirements

From requirements.txt:
- flask
- flask-cors
- python-dotenv
- google-generativeai

## Screenshots

<img width="1902" height="640" alt="image" src="https://github.com/user-attachments/assets/8d1dcafb-9441-4ad2-b44b-73e0f195b1da" />
<img width="1904" height="560" alt="image" src="https://github.com/user-attachments/assets/18840126-34ef-4dec-887a-f69415a65330" />
<img width="1901" height="748" alt="image" src="https://github.com/user-attachments/assets/a4dbcaca-2194-45a8-b9ef-7f0870977945" />


