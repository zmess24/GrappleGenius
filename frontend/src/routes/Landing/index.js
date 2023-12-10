import React from "react";
import VideoForm from "./components/VideoForm";

function Home() {
	return (
		<div className="relative isolate px-6 lg:px-8">
			<div className="mx-auto max-w-2xl sm:pt-36 lg:pt-48">
				<div className="text-center pb-5">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">GrappleGenius</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						A BJJ analysis application where users can input YouTube BJJ technique videos & GrappleGenius will generate concise,
						step-by-step breakdowns to enhance understanding and learning. Built on OpenAI technology.
					</p>
				</div>
				<VideoForm />
			</div>
		</div>
	);
}

export default Home;
