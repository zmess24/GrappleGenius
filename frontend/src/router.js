import React from "react";
import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
// Page Elements
import Landing from "./routes/Landing";
import NavLayout from "./components/Layout";
import ErrorPage from "./error-page";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<NavLayout />} errorElement={<ErrorPage />}>
			<Route path="/" element={<Landing />} />
		</Route>
	)
);

export default router;
