import os
import base64
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("API key not found in .env file")

genai.configure(api_key=API_KEY)

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze_image():
    try:
        prompt = "Identify the celebrities in this image. Just return the name."

        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        image_file = request.files["image"]
        image_bytes = image_file.read()
        image_base64 = base64.b64encode(image_bytes).decode("utf-8")

        model = genai.GenerativeModel("models/gemini-2.0-flash")

        response = model.generate_content([
            {"role": "user", "parts": [
                {"text": prompt},
                {"inline_data": {"mime_type": "image/jpeg", "data": image_base64}}
            ]}
        ])

        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)