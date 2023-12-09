import React from "react";

function SummaryList({ summaries }) {
	let classNames = (...classes) => {
		return classes.filter(Boolean).join(" ");
	};

	let renderSummaryItem = (summary) => {
		return (
			<li key={summary.id}>
				<a
					href={summary.id}
					className={classNames(
						summary.current ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
						"group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
					)}
				>
					{summary.title}
				</a>
			</li>
		);
	};

	let renderEmptyList = () => {
		return <li className="justify-center text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6">No summaries created yet</li>;
	};

	return (
		<nav className="flex flex-1 flex-col">
			<ul className="flex flex-1 flex-col gap-y-7">
				<li>
					<ul className="-mx-2 space-y-1">{summaries.length > 0 ? summaries.map(renderSummaryItem) : renderEmptyList()}</ul>
				</li>
			</ul>
		</nav>
	);
}

export default SummaryList;
