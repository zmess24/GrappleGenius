import whisper
import pytube as pt

model = whisper.load_model("base")

def download_video():
    print("--DOWNLOADING VIDEO--")
    video = pt.YouTube("https://www.youtube.com/watch?v=b8b9tR21K8Q")
    stream = video.streams.filter(only_audio=True)[0]
    stream.download(filename="audio_english.mp3")

def transcribe_video():
    print("--TRANSCRIBING VIDEO--")
    result = model.transcribe("audio_english.mp3")
    print("--FINISHED TRANSCRIPTION")
    return result["text"]