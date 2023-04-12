import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Profile from "./pages/Profile";

export default function CustomRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/create" element={<Create />} />
			<Route path="/profile" element={<Profile />} />
		</Routes>
	);
}
