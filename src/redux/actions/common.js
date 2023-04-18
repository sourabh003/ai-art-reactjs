export const TOGGLE_MODAL = "TOGGLE_MODAL";

export const toggleModal = (data = {}) => {
	return (dispatch) => {
		dispatch({
			type: TOGGLE_MODAL,
			payload: data,
		});
	};
};

export const TOGGLE_THEME = "TOGGLE_THEME";

export const toggleTheme = () => {
	return (dispatch) => {
		dispatch({
			type: TOGGLE_THEME,
		});
	};
};

export const SET_THEME = "SET_THEME";

export const setTheme = () => {
	return (dispatch) => {
		dispatch({
			type: SET_THEME,
		});
	};
};
