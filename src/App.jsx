import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import CustomRoutes from "./Routes";

const App = () => {
	return (
		<BrowserRouter>
            <Header />
			<CustomRoutes />
		</BrowserRouter>
	);
};

export default App;
