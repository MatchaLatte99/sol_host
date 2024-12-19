import os
import google.generativeai as genai

from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
    system_instruction="You are SolAI, an expert AI assistant by Sol Power, specializing in solar energy solutions. Help users optimize solar power generation, manage energy systems, sell excess energy, understand policies, and troubleshoot technical issues. Provide real-time pricing insights and financial options like payouts or bill discounts. Always use a clear, professional, and user-friendly tone.",
)

chat_session = model.start_chat(
    history=[]
)

print("Bot: Hello, how can I help you?")


while True:

    user_input = input("You: ")
    print()

    response = chat_session.send_message(user_input)

    model_response = response.text

    print(f'Bot: {model_response}')


    chat_session.history.append({"role": "user", "parts": [user_input]})
    chat_session.history.append({"role": "model", "parts": [model_response]})