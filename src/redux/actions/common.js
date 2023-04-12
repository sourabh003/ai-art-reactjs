export const TOGGLE_MODAL = "TOGGLE_MODAL";

export const toggleModal = (data = {}) => {
	return (dispatch) => {
		dispatch({
			type: TOGGLE_MODAL,
			payload: data,
		});
	};
};
