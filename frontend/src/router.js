import React from "react";
import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
// Page Elements
import NavLayout from "./layout";
import Landing from "./routes/Landing";
import Summary from "./routes/Summary";
import About from "./routes/About";
import ErrorPage from "./error-page";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<NavLayout />} errorElement={<ErrorPage />}>
			<Route path="/" element={<Landing />} />
			<Route path="/about" element={<About />} />
			<Route path="/summary/:id" element={<Summary />} />
		</Route>
	)
);

export default router;
