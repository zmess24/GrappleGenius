import React from "react";
import { RingLoader } from "react-spinners";
import { Transition } from "@headlessui/react";

function LoadingMessage({ show, streamStatus }) {
	return (
		<Transition
			show={show}
			enter="transition-opacity duration-1000"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-500"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			className="flex flex-col justify-items-center"
		>
			<p className="my-6 text-center leading-6 text-md text-gray-600">{streamStatus}</p>
			<div className="flex justify-center">
				<RingLoader color="#3f51b5" />
			</div>
		</Transition>
	);
}

export default LoadingMessage;
