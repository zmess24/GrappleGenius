import React from "react";
import { Route, createRoutesFromElements, createBrowserRouter, useLoaderData } from "react-router-dom";
// Page Elements
import NavLayout from "./layout";
import Landing from "./routes/Landing";
import Summary from "./routes/Summary";
import About from "./routes/About";
import ErrorPage from "./error-page";
import { loadCache } from "./cache";

async function loader({ params }) {
	let data = await loadCache();
	return data.find((s) => s.id === params.id);
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<NavLayout />} errorElement={<ErrorPage />}>
			<Route path="/" element={<Landing />} />
			<Route path="/about" element={<About />} />
			<Route path="/summary/:id" element={<Summary />} loader={loader} />
		</Route>
	)
);

export default router;
