import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()
app = Flask(__name__)
CORS(app)

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)

TABLE = "interview_questions"

@app.route("/")
def health_check():
    return {"status": "ok"}, 200

@app.get("/api/questions")
def get_questions():
    try:
        response = supabase.table(TABLE).select("*").execute()
        # print("this is what response looks like", response)
        return response.data
    except Exception as error:
        return jsonify({"error": str(error)}), 500
    

@app.post("/api/questions")
def add_question():
    try:
        data = request.get_json()
        if not data:
            return {"error": "JSON required."}, 400
        
        question = data.get("question", "").strip()

        if not question:
            return jsonify({"error": "Question must be present"}), 400
        
        response = supabase.table(TABLE).insert({"question": question}).execute()
        return response.data[0], 201

    except Exception as error:
        return jsonify({"error": str(error)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5002)
