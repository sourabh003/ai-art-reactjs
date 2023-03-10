import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";

export default function CustomRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/create" element={<Create />} />
		</Routes>
	);
}
