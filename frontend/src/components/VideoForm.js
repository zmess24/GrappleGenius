import React, { useState } from "react";
import { VideoCameraIcon } from "@heroicons/react/20/solid";
import axios from "axios";

function VideoForm({ updateContent }) {
	let [inputValue, setInputValue] = useState("");
	let [disabledStatus, setDisabledStatus] = useState(false);
	let [error, setError] = useState({
		status: false,
		message: "",
	});

	let validateInput = (url) => {
		var re = new RegExp(/youtube.com\/watch\?v=(.*)/);
		setError({
			status: true,
			message: "Oops! Entered URL is not valid.",
		});

		return !re.test(url);
	};

	let handleSubmit = async (e) => {
		e.preventDefault();
		let error = validateInput(inputValue);
		if (!error) {
			try {
				setDisabledStatus(true);
				let res = await axios.get("http://localhost:8000/api/predict");
				// let res = await axios.get("/api/transcribe");
				debugger;
				updateContent(res.data.message);
				setInputValue("");
			} catch (err) {
				console.log(err.message);
			}
			setDisabledStatus(false);
		}
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
					disabled={disabledStatus}
					required
					className={`block w-full text-center rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
						error.status
							? "bg-red-50 border-red-500 text-red-900 focus:ring-red-600 ring-red-300 "
							: "text-gray-900 focus:ring-indigo-600 ring-gray-300 "
					}`}
					placeholder="https://www.youtube.com/watch?v=xyCakxmx-2E"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
				/>
			</div>
			<p className="mt-2 text-sm text-red-600 dark:text-red-500 text-center" hidden={!error.status}>
				{error.message}
			</p>
		</form>
	);
}

export default VideoForm;
