import { removeData, setData } from "../utils/commonMethods";
import { USER } from "../utils/constants";
import types from "./types";

const initialState = {
	user: null,
	isLoggedIn: false,
	dialog: "",
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.setUser:
			return { ...state, user: payload, isLoggedIn: true };

		case types.login:
			setData(USER, payload);
			return { ...state, user: payload, isLoggedIn: true };

		case types.logout:
			removeData(USER);
			return { ...state, user: null, isLoggedIn: false };

		case types.showDialog:
			return { ...state, dialog: payload };

		case types.closeDialog:
			return { ...state, dialog: "" };

		default:
			return { ...state };
	}
};
