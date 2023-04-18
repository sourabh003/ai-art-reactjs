import { apiPost, generateURL } from "../../utils/commonMethods";

class AuthService {
    login(data) {
        return apiPost(generateURL("/users/login"), data);
    }
}

export default new AuthService();
