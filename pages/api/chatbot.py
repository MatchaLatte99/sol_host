from flask import Flask, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Configure Generative AI with your API key
genai.configure(api_key="your-gemini-api-key")

@app.route("/chatbot", methods=["POST"])
def chatbot():
    # Parse incoming JSON request
    data = request.json
    message = data.get("message", "")
    user_id = data.get("userId", "user123")

    # Validate input
    if not message:
        return jsonify({"error": "Message is required"}), 400

    try:
        # Configure generative AI parameters
        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        }

        # Create a Generative AI model
        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash-exp",
            generation_config=generation_config,
        )

        # Start a chat session
        chat_session = model.start_chat(history=[])
        response = chat_session.send_message(message)

        # Return the response from the chatbot
        return jsonify({"reply": response.text})
    except Exception as e:
        # Handle errors
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=False)
