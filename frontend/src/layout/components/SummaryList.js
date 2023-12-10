import React from "react";
import { NavLink } from "react-router-dom";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { clearCache } from "../../cache";

function SummaryList({ summaries, updateStore }) {
	let activeLink = "whitespace-nowrap group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold bg-gray-800 text-white";
	let inActiveLink =
		"whitespace-nowrap group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800";

	let renderSummaryItem = (summary) => {
		let length = 33;
		let title = summary.title;
		title = title.length > length ? title.substring(0, length - 3) + "..." : title;

		return (
			<li key={summary.id}>
				<NavLink
					to={`/summary/${summary.id}`}
					state={{ data: summary }}
					className={({ isActive, isPending }) => (isPending ? inActiveLink : isActive ? activeLink : inActiveLink)}
				>
					{title}
				</NavLink>
			</li>
		);
	};

	let renderEmptyList = () => {
		return <li className="justify-center text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6">No summaries created yet</li>;
	};

	let handleClearCache = () => {
		clearCache();
		updateStore([]);
	};

	return (
		<nav className="flex flex-1 flex-col">
			<ul className="flex flex-1 flex-col gap-y-7">
				<li>
					<ul className="-mx-2 space-y-1">{summaries.length > 0 ? summaries.map(renderSummaryItem) : renderEmptyList()}</ul>
				</li>
				<li className="mt-auto">
					<NavLink
						to="/about"
						className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
					>
						<InformationCircleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
						About
					</NavLink>
					<NavLink
						to={"/"}
						onClick={handleClearCache}
						className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white cursor-pointer"
					>
						<TrashIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
						Clear Cache
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default SummaryList;
