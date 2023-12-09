import React from "react";

function SummaryError() {
	return (
		<div className="relative isolate px-6 lg:px-8">
			<div className="mx-auto max-w-2xl sm:pt-48 lg:pt-48">
				<div className="text-center pb-5">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Apologies!</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">There was an error attempting to parse the summarized video!</p>
				</div>
			</div>
		</div>
	);
}

export default SummaryError;
