import axios from "axios";
import { URL_API, config_headers } from "../Config";

//CLASS
export class MasterService {
  // Simple
  // this.MasterService.get(this , 'ct_CASE', "getQA_CT_CASE", {} ).then(res => { ***Write here***  });
  // หรือ
  // this.MasterService.get(this, 'ct_CASE', "getQA_CT_CASE", {} );
  get = async (_this, keyState, API, body = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        let authorization = await config_headers();
        await axios
          .post(URL_API("backOfficeApi/Master/" + API), body, authorization)
          .then((res) => {
            _this.setState({ [`${keyState}`]: res.data });
            resolve(res.data);
          });
      } catch (err) {
        reject(err);
        let result = `เกิดข้อผิดพลาด Status Code: ${err.response.data.error.status} ${err.response.data.error.message}`;
        return result;
      } finally {
        if (_this.state[`${keyState}`] !== null) {
          return true;
        } else {
          return "เกิดข้อผิดพลาด";
        }
      }
    });
  };
}

//HOOK
export const masterService = async (API, body = {}, type = "GET") => {
  if (type === "GET") {
    return new Promise(async (resolve, reject) => {
      try {
        let authorization = await config_headers();
        await axios
          .get(URL_API("backOfficeApi/Master/" + API), authorization)
          .then((res) => {
            resolve(res.data);
          });
      } catch (err) {
        reject(err);
      } finally {
      }
    });
  } else if (type === "POST") {
    return new Promise(async (resolve, reject) => {
      try {
        let authorization = await config_headers();
        await axios
          .post(URL_API("backOfficeApi/Master/" + API), body, authorization)
          .then((res) => {
            resolve(res.data);
          });
      } catch (err) {
        reject(err);
      } finally {
      }
    });
  }
};

export const masterServiceWebPortal = async (API, body = {}, type = "GET") => {
  if (type === "GET") {
    return new Promise(async (resolve, reject) => {
      try {
        let authorization = await config_headers();
        await axios
          .get(URL_API("apiWebPortal/Master/" + API), authorization)
          .then((res) => {
            resolve(res.data);
          });
      } catch (err) {
        reject(err);
      } finally {
      }
    });
  } else if (type === "POST") {
    return new Promise(async (resolve, reject) => {
      try {
        let authorization = await config_headers();
        await axios
          .post(URL_API("apiWebPortal/Master/" + API), body, authorization)
          .then((res) => {
            resolve(res.data);
          });
      } catch (err) {
        reject(err);
      } finally {
      }
    });
  }
};

export const masterGenSpreadsheet = async (API, body = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      let url = window.location.origin + "/export/";
      if (window.location.hostname.indexOf("localhost") !== -1) {
        url = "http://localhost:30004/export/";
      }
      // await axios.post(window.location.origin + '/export/' + API, body, authorization)
      await axios
        .post(url + API, body, authorization) //TEST
        .then((res) => {
          resolve(res);
        });
    } catch (err) {
    } finally {
    }
  });
};
