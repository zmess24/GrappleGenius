import React from "react";
import { useLocation, useLoaderData } from "react-router-dom";
import { Transition } from "@headlessui/react";
import SummaryError from "./components/SummaryError";
import { Link } from "react-router-dom";

function Summary() {
	let data = useLoaderData(); // If page is hit directly.
	const { state } = useLocation(); // If page is hit dynamically.
	let summary, title, link;
	debugger;
	try {
		title = state ? state.data.title : data.title;
		summary = state ? JSON.parse(state.data.summary) : JSON.parse(data.summary);
		link = state ? state.data.link : data.link;
	} catch (err) {
		return <SummaryError />;
	}
	console.log(link);
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
			<Link
				to={link}
				target="_blank"
				className="text-3xl no-underline hover:underline text-blue-500 font-bold tracking-tight text-gray-900 pb-5"
			>
				{title}
			</Link>
			<h3 className="text-xl font-bold tracking-tight text-gray-900 italic py-5">Overview</h3>
			<p className="text-md leading-6 text-gray-600 pb-5">{summary.overview}</p>
			<h3 className="text-xl font-bold tracking-tight text-gray-900 italic pb-5">Techniques</h3>
			{summary.techniques.map((technique, i) => {
				return (
					<section className="pb-5">
						<h4 className="text-md font-bold tracking-tight text-gray-900 pb-5">
							{i + 1}. {technique.techniqueName}
						</h4>
						<ol className="list-decimal list-inside">
							{technique.steps.map((step, j) => {
								return <li key={j + i}>{step}</li>;
							})}
						</ol>
					</section>
				);
			})}
			<h3 className="text-xl font-bold tracking-tight text-gray-900 italic pb-5">Conclusion</h3>
			<p className="text-md leading-6 text-gray-600">{summary.conclusion}</p>
		</Transition>
	);
}

export default Summary;
