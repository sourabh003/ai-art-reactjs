import { TOGGLE_MODAL } from "../actions/common";

const initialState = {
	isModalOpen: false,
	modal: "",
	modalData: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case TOGGLE_MODAL:
			const { modal = "", modalData = null } = payload;
			let isModalOpen = state.modal !== "";
			let modalState = {
				modal: isModalOpen ? "" : modal,
				modalData: isModalOpen ? null : modalData,
				isModalOpen: !isModalOpen,
			};
			return { ...state, ...modalState };

		default:
			return { ...state };
	}
};
