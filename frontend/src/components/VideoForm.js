import React, { useState } from "react";
import { VideoCameraIcon } from "@heroicons/react/20/solid";

function VideoForm() {
	let [inputValue, setInputValue] = useState("");

	let handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputValue);
		setInputValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="relative mt-2 rounded-md shadow-sm">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<VideoCameraIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</div>
				<input
					type="text"
					name="youtubeInput"
					id="youtubeInput"
					className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					placeholder="https://www.youtube.com/watch?v=xyCakxmx-2E&ab_channel=JordanTeachesJiujitsu"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
				/>
			</div>
		</form>
	);
}

export default VideoForm;
