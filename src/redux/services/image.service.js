import { apiGet, apiPost, apiPut, generateURL } from "../../utils/commonMethods";

class ImageService {
    generate(data) {
        return apiPost(generateURL("/images/generate"), data);
    }
	getAllImages(data) {
		return apiGet(generateURL("/images"), data);
    }
    getUserImages(data) {
		return apiPost(generateURL("/images/user"), data);
    }
    updateVisibility(data) {
        return apiPut(generateURL("/images"), data);
    }
}

export default new ImageService();