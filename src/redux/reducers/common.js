import { setData } from "../../utils/commonMethods";
import { THEME } from "../../utils/constants";
import { SET_THEME, TOGGLE_MODAL, TOGGLE_THEME } from "../actions/common";

const initialState = {
	appTheme: "dark",
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

		case TOGGLE_THEME:
			const appTheme = state.appTheme === "light" ? "dark" : "light";
			setData(THEME, appTheme);
			return { ...state, appTheme };

		case SET_THEME:
			return { ...state, appTheme: payload };

		default:
			return { ...state };
	}
};
