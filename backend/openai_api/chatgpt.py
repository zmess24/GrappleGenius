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
    system_description = "You are helpful sentiment analysis assistant whose sole purpose is to determine if the provided YouTube video titles are Brazilian Ju-Jitsu, Judo, or Wrestling instructionial videos. I only want you to give 'True' or 'False' answers with no additional information."
    # Generate Response
    response = client.chat.completions.create(
        model="ft:gpt-3.5-turbo-0613:personal:grapple-genius:8WyX4haA",
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
    You are a BJJ transcript summarizer assistant. Any transcript from a BJJ YouTube you are given, you will respond by:
        - Overview: Provide a brief overview section of the techniques or concepts discussed in the transcript.
        - Techniques: Breakdown each technique or concept into step by step instructions on how to execute it.
        - Conclusion: Please include a brief conclusion highlighting what was discussed.
        - Please returns this data in JSON using the following format: { overview: "", techniques: [{ techniqueName: "", steps: [] }, { techniqueName: "", steps: [] }], conclusion: ""}
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

def transcribe_video(audio_file):
    transcript = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
    )

    return transcript.text