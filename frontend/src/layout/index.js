import { Fragment, useState, useEffect, useContext } from "react";
import SummaryList from "./components/SummaryList";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { loadCache } from "../cache";

const summaries = [
	{ id: "b8b9tR21K8Q", title: "BJJ No-Gi Kimura Attack Sequence from Full Guard", summary: {}, current: true },
	{ id: "b8b9tR21K8Q", title: "BJJ No-Gi Kimura Attack Sequence from Full Guard", summary: {}, current: false },
	{ id: "b8b9tR21K8Q", title: "BJJ No-Gi Kimura Attack Sequence from Full Guard", summary: {}, current: false },
];

export default function NavLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [summaries, setSummaries] = useState([]);

	useEffect(async () => {
		let data = await loadCache();
		setSummaries(data);
	}, []);
	return (
		<>
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-900/80" />
						</Transition.Child>

						<div className="fixed inset-0 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-300"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
											<button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
												<span className="sr-only">Close sidebar</span>
												<XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
											</button>
										</div>
									</Transition.Child>
									{/* Sidebar component, swap this element with another sidebar if you like */}
									<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
										<div className="flex h-16 shrink-0 items-center">
											<img
												className="h-8 w-auto"
												src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
												alt="Your Company"
											/>
										</div>
										<SummaryList summaries={summaries} />
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
					{/* Sidebar component, swap this element with another sidebar if you like */}

					<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
						<div className="flex flex-row justify-between h-16 shrink-0 items-center">
							<img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
							<Link to="/">
								<PencilSquareIcon className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white" aria-hidden="true" />
							</Link>
						</div>
						<SummaryList summaries={summaries} />
					</div>
				</div>

				<div className="lg:pl-72">
					<div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
						<button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
							<span className="sr-only">Open sidebar</span>
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>

					<main>
						<div className="px-4 sm:px-6 lg:px-8">
							<Outlet context={{ summaries, setSummaries }} />
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
