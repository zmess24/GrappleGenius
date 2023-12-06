from openai import OpenAI
import os
from dotenv import load_dotenv

# Load 'dotenv' in order to fetch ENV variables.
load_dotenv()

# Fetch OpenAI API key.
API_KEY = os.getenv("OPENAI_API_KEY"),

# Init instance with key.
client = OpenAI(api_key=API_KEY[0])

#
completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ]
)

print(completion.choices[0].message)