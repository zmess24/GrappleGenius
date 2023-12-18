import pytube as pt
from . import chatgpt

def download_video(link):
    print(f"-- 1. DOWNLOADING VIDEO: {link.url} --")
    video = pt.YouTube(link.url)
    title = video.title
    video_id = video.video_id
    print("-- 2. CHECKING VIDEO CATEGORY--")
    sentiment = chatgpt.analyze_video_title(title)
    print(f"-- 3. SENTIMENT: {sentiment} --")
    if sentiment == "True": 
        print("-- 4. DOWNLOADING VIDEO")
        stream = video.streams.filter(only_audio=True)[0]
        stream.download(filename="audio_english.mp3")
    return { "sentiment": sentiment, "title": title, "video_id": video_id }
    

def transcribe_video():
    print("-- 5. TRANSCRIBING VIDEO --")
    # result = model.transcribe("audio_english.mp3")
    audio_file= open("audio_english.mp3", "rb")
    result = chatgpt.transcribe_video(audio_file)
    print("-- 6. SUMMARIZING --")
    summary = chatgpt.summarize_transcript(result)
    print("-- 7. FINISHED --")
    return summary