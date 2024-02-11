# GrappleGenius

GrappleGenius is a proof-of-concept application designed to experiment with OpenAI's API interace. Some features & functionality may not be fully developed yet.

### Technologies Used

| **Tech**                                                  | **Description**                                                                                                                    |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [FastAPI](https://fastapi.tiangolo.com/)                  | Modern, fast (high-performance), web framework for building APIs with Python 3.8+ based on standard Python type hints. components. |
| [React](https://react.dev/)                               | The library for web and native user interfaces                                                                                     |
| [PyTube](https://github.com/pytube/pytube)                | Pytube is a genuine, lightweight, dependency-free Python library (and command-line utility) for downloading YouTube videos.        |
| [OpenAI](https://platform.openai.com/docs/api-reference)  | LLM Provider                                                                                                                       |
| [TailwindCSS](https://tailwindcss.com/)                   | A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.               |
| [LocalForage](https://github.com/localForage/localForage) | LocalForage is a fast and simple storage library for JavaScript.                                                                   |

### Potential Future Enhancements

-   Add JSON validation for GPT summarization output put to handle malformed JSON responses.
-   Set a max minute cap on the duration of a YouTube video to save compute resources & API Costs.
-   Add validation check via client side cache to prevent concurrent transcription requests in the event of a browser refresh or second tab.

### How it Works

1. Accepts a BJJ intructional video URL from YouTube
2. Performs sentiment analysis via a fine-tuned ChatGPT model to validate if the provided YouTube URL is a BJJ instructional video.
3. Transcribes the video's audio output via OpenAI's Whisper API.
4. Summarizes the video transcript via prompt engineering a ChatGPT model.
5. Saves video summaries to cache for future viewing.
