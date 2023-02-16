import { apiGet, apiPost, apiPut, generateURL } from "../utils/commonMethods";

class ImageService {
    generate(data) {
        return apiPost(generateURL("/images/generate"), data);
    }
	getAllImages(data) {
		return apiGet(generateURL("/images"), data);
    }
    updateVisibility(data) {
        return apiPut(generateURL("/images"), data);
    }
}

export default new ImageService();
