import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import '../firebase'

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</Provider> 
);
