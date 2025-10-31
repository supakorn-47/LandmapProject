import axios from "axios";
import { URL_API, config_headers } from "../Config";
import { setSession, getSession } from "../../utils/Crypto";

export const loginService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      return await axios
        .post(URL_API("backOfficeApi/Authen/Login"), data)
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const getipAddress = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      return await axios.get(url).then((res) => {
        resolve(res.data);
      });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

// /backOfficeApi/Login/LoginAD
export const LoginADService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // return await axios.post(URL_API('backOfficeApi/Login/LoginAD'), data)
      return await axios
        .post(URL_API("backOfficeApi/Authen/Login"), data)
        .then((res) => {
          // console.log(`res.data `, res.data)
          // setSession("login", res.data);
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

//backOfficeApi/Login/LoginSAML
export const loginSAMLService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      return await axios
        .post(URL_API("backOfficeApi/Login/LoginSAML"), data)
        .then((res) => {
          // console.log(`res.data `, res.data)
          // setSession("login", res.data);
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};
