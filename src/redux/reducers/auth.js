import { removeData, setData } from "../../utils/commonMethods";
import { USER } from "../../utils/constants";
import {
	GET_USER_METRICS,
	GET_USER_METRICS_FAILED,
	GET_USER_METRICS_SUCCESS,
	SET_USER,
	USER_LOGIN,
	USER_LOGIN_FAILED,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
} from "../actions/auth";

const initialState = {
	isLoading: false,
	user: null,
	isLoggedIn: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_USER:
			return { ...state, user: payload, isLoggedIn: true };

		case USER_LOGIN:
			return { ...state, isLoading: true };

		case USER_LOGIN_SUCCESS:
			setData(USER, payload);
			return { ...state, isLoading: false, user: payload, isLoggedIn: true };

		case USER_LOGIN_FAILED:
			return { ...state, isLoading: false, isLoggedIn: false };

		case USER_LOGOUT:
			removeData(USER);
			return { ...state, user: null, isLoggedIn: false };

		case GET_USER_METRICS:
			return { ...state, isLoading: true };

		case GET_USER_METRICS_SUCCESS:
			const { remainingRequests, requestRefresh, photosCount } = payload;
			const user = {
				...state.user,
				remainingRequests,
				requestRefresh,
				photosCount,
			};
			return { ...state, isLoading: false, user };

		case GET_USER_METRICS_FAILED:
			return { ...state, isLoading: false };

		default:
			return { ...state };
	}
};
