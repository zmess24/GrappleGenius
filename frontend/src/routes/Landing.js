import React, { useState } from "react";
import VideoForm from "../components/VideoForm";
import Response from "../components/Response";

const fakeTitle = "BJJ No-Gi Kimura Attack Sequence from Full Guard";
const fakeData = {
	overview:
		"In this BJJ session, Professor Tom and his student explore the Z-Guard Camara attack sequence, focusing on versatile techniques for submissions, sweeps, and guard passes.",
	techniques: [
		{
			techniqueName: "Z-Guard Fundamentals",
			steps: [
				"Maintain space with hand and forearm.",
				"Use knee and elbow for support.",
				"Push away opponent's ribs and hip to prevent guard pass.",
			],
		},
		{
			techniqueName: "Camara Execution",
			steps: [
				"Use cross-face blocking hand as the initial Camara grip.",
				"Avoid reaching; kick the leg through and place the belly button on the opponent's elbow.",
				"Lock Camara with elbows close to the sides.",
				"Lift hips off the mat for real-life application.",
				"Deal with opponent's defense by bridging and focusing on the arm.",
			],
		},
		{
			techniqueName: "Camara Finish",
			steps: [
				"Pinch knees, ensure toes are on the correct side.",
				"Execute a deadlift and bridge to release the arm.",
				"Focus on pulling the opponent's arm up and finishing with a push.",
			],
		},
		{
			techniqueName: "Transition Options",
			steps: [
				"If opponent rolls intentionally, transition to a Camara trap position or follow up for a guard pass.",
				"Accumulate points strategically by considering sweeps and guard passes.",
			],
		},
		{
			techniqueName: "Alternative Sweep",
			steps: [
				"If unable to separate the arm for the Camara, practice the hip-bump sweep.",
				"Control the opponent's balance leg and execute the sweep to end up in top half guard.",
			],
		},
		{
			techniqueName: "Camara Trap from Sweep",
			steps: [
				"Forward roll into a Camara trap, similar to a 'TV' position.",
				"Focus on extending hands and applying pressure to the opponent's front deltoid for a near-side Camara.",
			],
		},
	],
	conclusion:
		"The Z-Guard Camara attack sequence provides a versatile set of techniques for submissions, sweeps, and guard passes. Professor Tom emphasizes the importance of adapting to different situations, showcasing the interconnectedness of techniques in Brazilian Jiu-Jitsu. Practitioners are encouraged to incorporate Z-Guard into their repertoire, master Camara variations, and enjoy the dynamic aspects of the art. The session also introduces a unique near-side Camara and highlights the importance of strategic point accumulation in a live scenario.",
};

function Home() {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState(null);

	let handleResponse = (response) => {
		debugger;
		setTitle(response.title);
		setSummary(JSON.parse(response.summary));
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
				{summary ? <Response title={title} summary={summary} /> : <></>}
			</div>
		</div>
	);
}

export default Home;
