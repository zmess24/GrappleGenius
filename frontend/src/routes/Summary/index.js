import React from "react";
import { useLocation } from "react-router-dom";
import { Transition } from "@headlessui/react";

function Summary({ data }) {
	const { state } = useLocation();
	debugger;
	// Load summary depending on if loaded from server or localForge.
	let title = state.data ? state.data.title : data.title;
	let summary = state.data ? JSON.parse(state.data.summary) : JSON.parse(data.summary);
	// if (!summary) return <></>;
	debugger;
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
									<li>
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
