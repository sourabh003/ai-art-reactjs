import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import CustomRoutes from "./Routes";
import { getData } from "./utils/commonMethods";
import { THEME, USER } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "./components/Dialog";
import { Toaster } from "react-hot-toast";
import { setUser } from "./redux/actions/auth";
import { Box } from "@chakra-ui/react";
import Lottie from "react-lottie-player";

const App = () => {
	const { appTheme } = useSelector((state) => state.common);
	const dispatch = useDispatch();
	const [animationData, setAnimationData] = useState(null);

	const playAnimation = () => {
		import("./assets/lotties/sunshine.json").then(setAnimationData);
	};

	useEffect(() => console.log({ animationData }), [animationData]);

	useEffect(() => {
		let user = getData(USER);
		if (user) dispatch(setUser(user));
	}, []);

	useEffect(() => {
		if (appTheme === "dark") {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	}, [appTheme]);

	return (
        <BrowserRouter>
			{animationData && (
				<Box className="custom-animation">
					<Lottie
						onComplete={() => setAnimationData(null)}
						play
						loop={false}
						animationData={animationData}
					/>
				</Box>
			)}
            <Toaster position="top-center" reverseOrder={false} />
			<Dialog />
			<Header playAnimation={playAnimation} />
			<CustomRoutes />
		</BrowserRouter>
	);
};

export default App;
