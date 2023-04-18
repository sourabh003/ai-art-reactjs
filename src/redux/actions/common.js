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
