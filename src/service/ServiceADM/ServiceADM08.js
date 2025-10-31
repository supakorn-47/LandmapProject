import axios from "axios";
import { config_headers, URL_API, config_headers_fromData } from "../Config";
import { formatDateAPI } from "../../utils/DateUtil";
// var dateFormat = require('dateformat');

export const ADM08GetDataList = async (body) => {
  let data = {
    create_dtm_from:
      body.create_dtm_from !== ""
        ? formatDateAPI(body.create_dtm_from, false)
        : "",
    create_dtm_to:
      body.create_dtm_to !== "" ? formatDateAPI(body.create_dtm_to, false) : "",
    approve_flag: body.approve_flag,
    register_type_seq: body.register_type_seq,
    person_fullname: body.person_fullname || undefined,
  };
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .post(URL_API("backOfficeApi/LPADM01/Get"), data, authorization)
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    } finally {
    }
  });
};

export const ADM08UploadFileData = async (body) => {
  var formData = new FormData();
  if (body.typeUpload === "add") {
    formData.append("register_file_seq", 0);
    formData.append("register_seq", body.register_seq);
  } else if (body.typeUpload === "edit") {
    formData.append("register_file_seq", body.register_file_seq);
    formData.append("register_seq", body.register_seq);
  }
  formData.append("register_remark", "");

  if (body.file !== undefined) {
    formData.append("file_attachs", body.file);
  }

  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers_fromData();
      await axios
        .put(
          URL_API("backOfficeApi/LPADM01/UploadFileData"),
          formData,
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

export const ADM08ApproveUserData = async (body, register_seq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .post(
          URL_API("backOfficeApi/LPADM01/ApproveUserData"),
          {
            register_seq: register_seq,
            approve_flag:
              body.approve_flag === "1" || body.approve_flag === 1 ? 1 : 0,
            remark: body.remark,
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

export const ADM08GetFilesList = async (register_seq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .get(
          URL_API(
            `backOfficeApi/LPADM01/GetRegisterFileList?register_seq=${register_seq}`
          ),
          { headers: authorization.headers }
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

export const ADM08DeleteRegisterFile = async (register_file_seq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let authorization = await config_headers();
      await axios
        .delete(
          URL_API(
            `backOfficeApi/LPADM01/DeleteRegisterFile?register_file_seq=${register_file_seq}`
          ),
          { data: {}, headers: authorization.headers }
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
