import imageService from "../services/image.service";

export const GET_IMAGES = "GET_IMAGES";
export const GET_IMAGES_FAILED = "GET_IMAGES_FAILED";
export const GET_IMAGES_SUCCESS = "GET_IMAGES_SUCCESS";

export const getImages = () => {
	return (dispatch) => {
		dispatch({
			type: GET_IMAGES,
		});
		return new Promise((resolve, reject) => {
			(async () => {
				try {
					const imagesResponse = await imageService.getAllImages();
					const { data = [], message = "", success = true } = imagesResponse;
					if (!success) {
						throw new Error(message);
					}
					let list = data.reverse();
					dispatch({
						type: GET_IMAGES_SUCCESS,
						payload: list,
					});
					return resolve(list);
				} catch (error) {
					dispatch({
						type: GET_IMAGES_FAILED,
					});
					return reject(error);
				}
			})();
		});
	};
};

export const getUserImages = (userData) => {
	return (dispatch) => {
		dispatch({
			type: GET_IMAGES,
		});
		return new Promise((resolve, reject) => {
			(async () => {
				try {
					const imagesResponse = await imageService.getUserImages(userData);
					const { data = [], message = "", success = true } = imagesResponse;
					if (!success) {
						throw new Error(message);
					}
					let list = data.reverse();
					dispatch({
						type: GET_IMAGES_SUCCESS,
						payload: list,
					});
					return resolve(list);
				} catch (error) {
					dispatch({
						type: GET_IMAGES_FAILED,
					});
					return reject(error);
				}
			})();
		});
	};
};

export const UPDATE_IMAGE_VISIBILITY = "UPDATE_IMAGE_VISIBILITY";
export const UPDATE_IMAGE_VISIBILITY_FAILED = "UPDATE_IMAGE_VISIBILITY_FAILED";
export const UPDATE_IMAGE_VISIBILITY_SUCCESS =
	"UPDATE_IMAGE_VISIBILITY_SUCCESS";

export const updateImageVisibility = (data) => {
	return (dispatch) => {
		dispatch({
			type: UPDATE_IMAGE_VISIBILITY,
		});
		return new Promise((resolve, reject) => {
			(async () => {
				try {
					const { success = false, message = "" } =
						await imageService.updateVisibility(data);
					if (!success) {
						dispatch({
							type: UPDATE_IMAGE_VISIBILITY_FAILED,
						});
						return reject(message);
					}
					dispatch({
						type: UPDATE_IMAGE_VISIBILITY_SUCCESS,
					});
					return resolve(message);
				} catch (error) {
					dispatch({
						type: UPDATE_IMAGE_VISIBILITY_FAILED,
					});
					return reject(error);
				}
			})();
		});
	};
};
