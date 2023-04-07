import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import CustomRoutes from "./Routes";
import { getData } from "./utils/commonMethods";
import { USER } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import types from "./redux/types";
import Dialog from "./components/Dialog";
import { Toaster } from "react-hot-toast";

const App = () => {
	const { user = null } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		let user = getData(USER);
		if (user) dispatch({ type: types.setUser, payload: user });
	}, []);

	useEffect(() => {
		console.log({ user });
	}, [user]);

	return (
		<BrowserRouter>
			<Toaster position="top-center" reverseOrder={false} />
			<Dialog />
			<Header />
			<CustomRoutes />
		</BrowserRouter>
	);
};

export default App;
