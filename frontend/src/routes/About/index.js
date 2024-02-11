import React from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

const technologies = [
	{ name: "FastAPI", link: "https://fastapi.tiangolo.com/", image: "https://static-00.iconduck.com/assets.00/fastapi-icon-512x512-a7ggfxfw.png" },
	{
		name: "React",
		link: "https://react.dev/",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
	},
	{ name: "PyTube", link: "https://pytube.io/en/latest/", image: "https://avatars.githubusercontent.com/u/16789089?s=48&v=4" },
	{ name: "OpenAI Whisper", link: "https://openai.com/research/whisper", image: "https://pbs.twimg.com/media/Fn5vzFqWAAsB_VG.png:large" },
	{ name: "OpenAI ChatGPT", link: "https://platform.openai.com/docs/introduction", image: "https://pbs.twimg.com/media/Fn5vzFqWAAsB_VG.png:large" },
	{ name: "Tailwind", link: "https://tailwindcss.com/", image: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" },
	{
		name: "LocalForage",
		link: "https://platform.openai.com/docs/introduction",
		image: "https://avatars.githubusercontent.com/u/18673496?s=48&v=4",
	},
];

function About() {
	const renderTechnologies = (t) => {
		return (
			<Link
				to={t.link}
				target="_blank"
				key={t.name}
				className="m-1 inline-flex items-center border py-1.5 pl-3 pr-3 text-sm font-medium text-grey-700 border-grey-600 bg-grey-400"
			>
				<img className="h-4 w-4 mr-2" src={t.image} alt={t.name} />
				<span>{t.name}</span>
			</Link>
		);
	};
	return (
		<Transition
			appear={true}
			show={true}
			enter="transition-opacity duration-1000"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-1000"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			className="mx-auto max-w-2xl sm:pt-10 lg:py-10"
		>
			<div className="mx-auto max-w-2xl">
				<div className="text-left pb-5">
					<h1 className="text-5xl font-bold tracking-tight text-gray-900">About GrappleGenius</h1>
					<h4 className="text-lg font-bold tracking-tight text-gray-600 pt-5">Technologies Used:</h4>
					<div className="flex flex-wrap items-center pt-5">{technologies && technologies.map(renderTechnologies)}</div>
					<p className="mt-6 text-md leading-8 text-gray-600">
						GrappleGenius is a proof-of-concept application designed to experiment with{" "}
						<a
							className="no-underline hover:underline text-blue-500 hover:cursor-pointer"
							href="https://platform.openai.com/docs/introduction"
							rel="noreferrer"
							target="_blank"
						>
							OpenAI's API interace
						</a>
						. Some features & functionality may not be fully developed yet.
					</p>

					<h4 className="text-lg font-bold tracking-tight text-gray-600 pt-5">How it Works:</h4>
					<ol className="list-decimal list-inside pt-5">
						<li className="text-md leading-8 text-gray-600">Accepts a BJJ intructional video URL from YouTube</li>
						<li className="text-md leading-8 text-gray-600">
							Performs sentiment analysis via a fine-tuned ChatGPT model to validate if the provided YouTube URL is a BJJ instructional
							video.
						</li>
						<li className="text-md leading-8 text-gray-600">Transcribes the video's audio output via OpenAI's Whisper API.</li>
						<li className="text-md leading-8 text-gray-600">Summarizes the video transcript via prompt engineering a ChatGPT model.</li>
						<li className="text-md leading-8 text-gray-600">Saves video summaries to cache for future viewing.</li>
					</ol>

					<h4 className="text-lg font-bold tracking-tight text-gray-600 pt-5">Potential Future Enhancements:</h4>
					<ol className="list-decimal list-inside pt-5">
						<li className="text-md leading-8 text-gray-600 italic">
							Add JSON validation for GPT summarization output put to handle malformed JSON responses.
						</li>
						<li className="text-md leading-8 text-gray-600 italic">
							Set a max minute cap on the duration of a YouTube video to save compute resources & API Costs.
						</li>
						<li className="text-md leading-8 text-gray-600 italic">
							Add validation check via client side cache to prevent concurrent transcription requests in the event of a browser refresh
							or second tab.
						</li>
					</ol>
				</div>
			</div>
		</Transition>
	);
}

export default About;
