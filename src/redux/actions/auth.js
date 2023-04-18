import authService from "../services/auth.service";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";

export const userLogin = (user) => {
	return (dispatch) => {
		dispatch({ type: USER_LOGIN });
		return new Promise((resolve, reject) => {
			(async () => {
				try {
					const userResponse = await authService.login(user);
					const { data = null, message = "", success = true } = userResponse;
					if (!success) {
						throw new Error(message);
					}
					dispatch({
						type: USER_LOGIN_SUCCESS,
						payload: data,
					});
					return resolve(data);
				} catch (error) {
					dispatch({
						type: USER_LOGIN_FAILED,
					});
					return reject(error);
				}
			})();
		});
	};
};

export const SET_USER = "SET_USER";

export const setUser = (user) => {
	return (dispatch) => {
		dispatch({ type: SET_USER, payload: user });
	};
};


export const USER_LOGOUT = "USER_LOGOUT";

export const userLogout = () => {
	return (dispatch) => {
		dispatch({ type: USER_LOGOUT });
	};
};

export const GET_USER_METRICS = "GET_USER_METRICS";
export const GET_USER_METRICS_FAILED = "GET_USER_METRICS_FAILED";
export const GET_USER_METRICS_SUCCESS = "GET_USER_METRICS_SUCCESS";

export const getUserMetrics = (email) => {
	return (dispatch) => {
		dispatch({ type: GET_USER_METRICS });
		return new Promise((resolve, reject) => {
			(async () => {
				try {
					const userResponse = await authService.getUserMetrics(email);
					const { data = null, message = "", success = true } = userResponse;
					if (!success) {
						throw new Error(message);
					}
					dispatch({
						type: GET_USER_METRICS_SUCCESS,
						payload: data,
					});
					return resolve(data);
				} catch (error) {
					dispatch({
						type: GET_USER_METRICS_FAILED,
					});
					return reject(error);
				}
			})();
		});
	};
};