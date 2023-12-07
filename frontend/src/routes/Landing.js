import React, { useState } from "react";
import VideoForm from "../components/VideoForm";

function Home() {
	const [content, setContent] = useState("");

	let handleResponse = (response) => {
		let parsedResponse = response.replaceAll(/\n/g, "");
		setContent(parsedResponse);
		// document.querySelector("#response").innerHTML = parsedResponse;
	};

	return (
		<div className="relative isolate px-6 lg:px-8">
			<div className="mx-auto max-w-2xl sm:pt-48 lg:pt-40">
				<div className="text-center pb-5">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Rollmaster</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						An BJJ analysis application where users can input YouTube BJJ technique videos & Rollmaster will generate concise,
						step-by-step breakdowns to enhance understanding and learning. Built on OpenAI technology.
					</p>
				</div>
				<VideoForm updateContent={handleResponse} />
				<section
					className={content !== "" ? `transition-opacity ease-in duration-700 opacity-100` : ""}
					dangerouslySetInnerHTML={{ __html: content }}
				></section>
			</div>
		</div>
	);
}

export default Home;
