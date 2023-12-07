import os
from openai import OpenAI
from dotenv import load_dotenv

# Load 'dotenv' in order to fetch ENV variables.
load_dotenv()

# Fetch OpenAI API key.
API_KEY = os.getenv("OPENAI_API_KEY"),

# Init OpenAI instance with API key.
client = OpenAI(api_key=API_KEY[0])

# Create Sentiment Analysis Bot
def analyze_video_title(title):
    # System Description
    system_description = "You are help sentiment analysis assistant whose sole purpose is to determine if the text I provide has to do with Brazilian Ju-Jitsu. I only want you to give True or False answers"

    # Generate Response
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_description},
            {"role": "user", "content": title}

        ]
    )

    # Parse out response & return result
    sentiment = response.choices[0].message.content
    return sentiment

# Summarize Transcript of text and convert into markdown syntax
def summarize_transcript(transcript):
    # System Description
    system_description = '''
    You are BJJ transcript summarizer assistant. Any transcript from a BJJ YouTube you are given, you will respond by:
        - Provide a brief overview of the technique.
        - Breakdown the technique into step by step instructions on how to execute the technique.
        - Please return your response in HTML format.
    '''

    # Generate Response
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_description},
            {"role": "user", "content": transcript}

        ]
    )

    # Parse out response & return result
    summary = response.choices[0].message.content
    return summary