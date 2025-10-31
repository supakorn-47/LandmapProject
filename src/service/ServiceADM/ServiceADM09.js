import axios from "axios";
import { config_headers, URL_API, config_headers_fromData } from "../Config";
import { formatDateTH, formatDateAPI, getDateTime } from "../../utils/DateUtil";
var dateFormat = require("dateformat");

export const ADM09GetDataList = async (body) => {
  let data = {
    create_dtm_from:
      body.create_dtm_from !== ""
        ? formatDateAPI(body.create_dtm_from, false)
        : "",
    create_dtm_to:
      body.create_dtm_to !== "" ? formatDateAPI(body.create_dtm_to, false) : "",
    person_fullname: body.person_fullname,
    register_type_seq:
      body.register_type_seq !== "" ? parseInt(body.register_type_seq) : 0,
    department_seq: body.department_seq,
    province_seq: body.province_seq !== "" ? body.province_seq : "",
    totalRecords: body.totalRecords,
    pageofnum: body.pageofnum,
    rowofpage: body.rowofpage,
  };
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .post(URL_API("backOfficeApi/LPADM02/Get"), data, authorization)
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const ADM09CreateData = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .post(
          URL_API("backOfficeApi/LPADM02/Add"),
          {
            ...body,
            person_birthdate: getDateTime(body.person_birthdate),
            approve_flag: 1,
            person_id:
              typeof body.person_id === "string"
                ? parseFloat(
                    body.person_id
                      .replace("-", "")
                      .replace("-", "")
                      .replace("-", "")
                      .replace("-", "")
                  )
                : body.person_id,
          },
          authorization
        )
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const ADM09UpdateData = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .put(
          URL_API("backOfficeApi/LPADM02/Update"),
          {
            ...body,
            department_seq:
              body.department_seq === null || body.department_seq === undefined
                ? -1
                : body.department_seq,
            // "department_seq": body.department_seq === -1 ? 0 : body.department_seq,
            amphur_seq:
              body.amphur_seq === null || body.amphur_seq === undefined
                ? -1
                : body.amphur_seq,
            opt_seq:
              body.opt_seq === null || body.opt_seq === undefined
                ? -1
                : body.opt_seq,
            province_seq: body.province_seq === null ? -1 : body.province_seq,
          },
          authorization
        )
        .then((res) => {
          resolve(res.data);
        });
      // await axios.put(URL_API('backOfficeApi/LPADM02/Update'), {
      //     "person_firstnameth": body.person_firstnameth,
      //     "person_middlenameth": "",
      //     "person_lastnameth": body.person_lastnameth,
      //     "person_phone": body.person_phone.replace('-', '').replace('-', ''),
      //     "person_email": body.person_email,
      //     "person_position": null,
      //     "province_seq": 0,
      //     "amphur_seq": 0,
      //     "landoffice_id": "0",
      //     "department_seq": 0,
      //     "opt_seq": 0,
      //     "department_phone": "",
      //     "user_password": body.user_password,
      //     "remark": "",
      //     "record_status": body.record_status
      // }, authorization)
      //     .then(res => {
      //         resolve(res.data);
      //     });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const ADM09DeleteData = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .delete(URL_API(`backOfficeApi/LPADM02/Delete?register_seq=${body}`), {
          data: {},
          headers: authorization.headers,
        })
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const verifyIdentityLandofficeAD = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .post(
          URL_API("backOfficeApi/LPADM02/VerifyIdentityLandofficeAD"),
          {
            username: body.user_id,
            password: body.user_password,
          },
          authorization
        )
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const ADM09ResetPassword = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .put(
          URL_API("backOfficeApi/LPADM02/ResetPassword?register_seq=" + body),
          {},
          authorization
        )
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const generateKey = async (action) => {
  if (action === "Consumer Key") {
    return new Promise(async (resolve, reject) => {
      try {
        let authorization = await config_headers();
        await axios
          .get(
            URL_API("backOfficeApi/LPADM02/GenerateConsumerKey"),
            authorization
          )
          .then((res) => {
            resolve(res.data);
          });
      } catch (err) {
        reject(err);
      } finally {
      }
    });
  } else {
    return new Promise(async (resolve, reject) => {
      try {
        let authorization = await config_headers();
        await axios
          .get(
            URL_API("backOfficeApi/LPADM02/GenerateConsumerSecret"),
            authorization
          )
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

export const getRegisterService = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .get(
          URL_API(
            "backOfficeApi/LPADM02/GetRegisterService?register_seq=" + body
          ),
          authorization
        )
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const updateConsumer = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .post(
          URL_API("backOfficeApi/LPADM02/UpdateConsumer"),
          body,
          authorization
        )
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const addRegisterService = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .post(
          URL_API("backOfficeApi/LPADM02/AddRegisterService"),
          body,
          authorization
        )
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const getConsumer = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .get(
          URL_API(`backOfficeApi/LPADM02/GetConsumer?register_seq=${body}`),
          authorization
        )
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};
