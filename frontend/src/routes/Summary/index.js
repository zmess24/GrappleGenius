import React from "react";
import { useLocation, useLoaderData } from "react-router-dom";
import { Transition } from "@headlessui/react";

function Summary() {
	let data = useLoaderData(); // If page is hit directly.
	const { state } = useLocation(); // If page is hit dynamically.

	let title = state ? state.data.title : data.title;
	let summary = state ? JSON.parse(state.data.summary) : JSON.parse(data.summary);
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
			<h2 className="text-3xl font-bold tracking-tight text-gray-900 pb-5">{title}</h2>
			<h3 className="text-xl font-bold tracking-tight text-gray-900 pb-5">Overview</h3>
			<p className="text-md leading-6 text-gray-600 pb-5">{summary.overview}</p>
			<h3 className="text-xl font-bold tracking-tight text-gray-900 pb-5">Techniques</h3>
			{summary.techniques.map((technique, i) => {
				return (
					<section className="pb-5">
						<h4 className="text-md font-bold tracking-tight text-gray-900 pb-5">
							{i + 1}. {technique.techniqueName}
						</h4>
						<ol>
							{technique.steps.map((step, j) => {
								return (
									<li key={i}>
										{j + 1}: {step}
									</li>
								);
							})}
						</ol>
					</section>
				);
			})}
			<h3 className="text-xl font-bold tracking-tight text-gray-900 pb-5">Conclusion</h3>
			<p className="text-md leading-6 text-gray-600">{summary.conclusion}</p>
		</Transition>
	);
}

export default Summary;
