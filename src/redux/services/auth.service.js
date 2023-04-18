import { apiGet, apiPost, generateURL } from "../../utils/commonMethods";

class AuthService {
	login(data) {
		return apiPost(generateURL("/users/login"), data);
	}
	getUserMetrics(data) {
		return apiGet(generateURL("/users/metrics"), data);
	}
}

export default new AuthService();
