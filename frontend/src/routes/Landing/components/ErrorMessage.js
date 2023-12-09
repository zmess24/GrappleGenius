import React from "react";
import { Transition } from "@headlessui/react";

function ErrorMessage({ show, message }) {
	return (
		<Transition
			show={show}
			enter="transition-opacity duration-1000"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-1000"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			className="mt-2 text-sm text-red-600 dark:text-red-500 text-center"
		>
			{message}
		</Transition>
	);
}

export default ErrorMessage;
