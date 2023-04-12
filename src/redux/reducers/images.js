import {
	GET_IMAGES,
	GET_IMAGES_SUCCESS,
	UPDATE_IMAGE_VISIBILITY,
	UPDATE_IMAGE_VISIBILITY_FAILED,
	UPDATE_IMAGE_VISIBILITY_SUCCESS,
} from "../actions/images";

const initialState = {
	isLoading: false,
	statusChangeLoading: false,
	images: [],
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_IMAGES:
			return { ...state, images: payload, isLoading: true };

		case GET_IMAGES_SUCCESS:
			return { ...state, images: payload, isLoading: false };

		case GET_IMAGES_SUCCESS:
			return { ...state, images: [], isLoading: false };

		case UPDATE_IMAGE_VISIBILITY:
			return { ...state, statusChangeLoading: true };

		case UPDATE_IMAGE_VISIBILITY_SUCCESS:
		case UPDATE_IMAGE_VISIBILITY_FAILED:
			return { ...state, statusChangeLoading: false };

		default:
			return { ...state };
	}
};
