import React, { useState } from "react";
import { VideoCameraIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import { saveCache } from "../../../cache";
import { useOutletContext } from "react-router-dom";

function VideoForm() {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ showError: false, message: "" });
	const { summaries, setSummaries } = useOutletContext();

	let validateInput = (url) => {
		// Check if entered URL format is a valid YouTube Link.
		let pattern = /youtube.com\/watch\?v=(.*)/;
		var re = new RegExp(pattern);
		if (!re.test(url)) {
			setError({ showError: true, message: `Oops! "${url}" is not a valid YouTube URL.` });
			return true;
		}

		// Check if entered YouTube link has already been summarized.
		let videoId = url.split("v=")[1].split("&")[0];
		let videoFound = summaries.find((s) => s.id === videoId);

		if (videoFound) {
			setError({ showError: true, message: `Oops! "${url}" has already been transcribed.` });
			return true;
		}

		return false;
	};

	let valdiateOutput = (data) => {
		console.log(data);
	};

	let updateContextAndCache = async (data) => {
		let timestamp = new Date().getTime();
		let newSummary = { ...data, timestamp, link: inputValue };
		let newSummariesList = [...summaries, newSummary];
		setSummaries(newSummariesList);
		await saveCache(newSummariesList);
		console.log(`Saving video ${newSummary.id} saved to cache and state.`);
	};

	let handleSubmit = async (e) => {
		e.preventDefault();
		let error = validateInput(inputValue);
		if (!error) {
			try {
				setLoading(true);
				let res = await axios.post("/api/predict", { url: inputValue });
				// let res = await axios.post("/api/predict", { url: inputValue });
				if (res.data.error) {
					setError({ showError: true, message: res.data.error });
				} else {
					valdiateOutput(res.data);
					await updateContextAndCache(res.data);
					debugger;
					navigate(`/summary/${res.data.id}`, { state: { data: res.data } });
					setInputValue("");
					setError({ showError: false, message: "" });
				}
				setLoading(false);
			} catch (err) {
				console.log(err.message);
			}
		}
	};

	let handleClick = () => {
		setError({ showError: false, message: "" });
	};

	const handleInputChange = (e) => {
		setError({ showError: false, message: "" });
		setInputValue(e.target.value);
	};

	let normalInput = "text-gray-900 focus:ring-indigo-600 ring-gray-300";
	let errorInput = "bg-red-50 border-red-500 text-red-900 focus:ring-red-600 ring-red-300 ";
	return (
		<form onSubmit={handleSubmit}>
			<div className="relative mt-2 rounded-md shadow-sm">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<VideoCameraIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</div>
				<input
					type="text"
					onClick={handleClick}
					name="youtubeInput"
					id="youtubeInput"
					disabled={loading}
					required
					className={`block w-full text-center rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:bg-gray-200 ${
						error.showError ? errorInput : normalInput
					}`}
					placeholder="Please enter a YouTube video link here..."
					onChange={handleInputChange}
					value={inputValue}
				/>
			</div>
			<ErrorMessage show={error.showError} message={error.message} />
			<LoadingMessage show={loading} />
		</form>
	);
}

export default VideoForm;
