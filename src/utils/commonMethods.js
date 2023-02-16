import axios from "axios";
import { API_BASE_URL } from "./constants";

export const generateURL = (endpoint) => API_BASE_URL + endpoint;

export const apiReq = (method, url, data) => {
	return new Promise((resolve, reject) => {
		axios({
			method,
			url,
			data,
		})
			.then((res) => {
				return resolve(res.data);
			})
			.catch((err) => {
				return reject(err.response.data || err.message);
			});
	});
};

export const apiGet = (url, data) => {
	return apiReq("get", url, data);
};

export const apiPost = (url, data) => {
	return apiReq("post", url, data);
};

export const apiPut = (url, data) => {
	return apiReq("put", url, data);
};

export const checkUser = () => {};

export const setData = (key, value) => {
	if (typeof window !== "undefined") {
		localStorage.setItem(key, JSON.stringify(value));
	}
};
export const setMultipleData = (data) => {
	if (typeof window !== "undefined") {
		[...data].forEach(({ key, value }) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}
};

export const getData = (key) => {
	if (typeof window !== "undefined") {
		const data = JSON.parse(localStorage.getItem(key));
		if (data) return data;
		return null;
	}
};

export const removeData = (key) => {
	localStorage.removeItem(key);
};

export const removeMultipleData = (data) => {
	if (typeof window !== "undefined") {
		[...data].forEach((key) => {
			localStorage.removeItem(key);
		});
	}
};

export const clearLocalStorage = () => {
	localStorage.clear();
};

