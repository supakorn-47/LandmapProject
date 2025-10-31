import axios from 'axios';
import { config_headers, URL_API, config_headers_delete } from '../Config';
import { getDateTime } from '../../utils/DateUtil';
var dateFormat = require('dateformat');

export const ADM07GetDataList = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let authorization = await config_headers();
            await axios.get(URL_API('backOfficeApi/LPADM04/Get'), authorization)
                .then(res => {
                    resolve(res.data);
                });
        }
        catch (err) {
            reject(err);
        }
        finally {

        }
    });
}

export const ADM07CreateData = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let authorization = await config_headers();
            await axios.post(URL_API('backOfficeApi/LPADM04/Add'), {
                "form_seq": 0,
                "form_date": getDateTime(new Date(body.form_date)),
                "form_name_th": body.form_name_th,
                "form_name_en": body.form_name_en,
                "form_start_date": getDateTime(new Date(body.form_start_date)),
                "form_finish_date": getDateTime(new Date(body.form_finish_date)),
                "form_remark": body.form_remark,
                "random_num": body.random_num
            }, authorization)
                .then(res => {
                    resolve(res.data);
                });
        }
        catch (err) {
            reject(err);
        }
        finally {

        }
    });
}

export const ADM07UpdateData = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let authorization = await config_headers();
            await axios.put(URL_API('backOfficeApi/LPADM04/Update'), {
                "form_seq": body.form_seq,
                "form_date": getDateTime(new Date(body.form_date)),
                "form_name_th": body.form_name_th,
                "form_name_en": body.form_name_en,
                "form_start_date": getDateTime(new Date(body.form_start_date)),
                "form_finish_date": getDateTime(new Date(body.form_finish_date)),
                "form_remark": body.form_remark,
                "random_num": body.random_num
            }, authorization)
                .then(res => {
                    resolve(res.data);
                });
        }
        catch (err) {
            reject(err);
        }
        finally {

        }
    });
}

export const ADM07DeleteData = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let authorization = await config_headers_delete({
                // "form_seq": body
            });
            await axios.delete(URL_API('backOfficeApi/LPADM04/Delete?id=' + body), authorization)
                .then(res => {
                    resolve(res.data);
                });
        }
        catch (err) {
            reject(err);
        }
        finally {

        }
    });
}

export const ADM07GetDataSurveyUserByFormID = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let authorization = await config_headers();
            await axios.post(URL_API('backOfficeApi/LPADM04/GetDataSurveyUserByFormID'), {
                "form_seq": body.form_seq
            }, authorization)
                .then(res => {
                    resolve(res.data);
                });
        }
        catch (err) {
            reject(err);
        }
        finally {

        }
    });
}

export const ADM07CreateDataSurveyUser = async (row, body) => {
    let register_type_seq_list = [];
    let random_num_list = [];
    body.forEach(element => {
        if (element.check_from === "1") {
            register_type_seq_list.push(parseInt(element.register_type_seq));
            random_num_list.push(element.random_num === undefined || element.random_num === null ? 0 : element.random_num);
        }
    });
    return new Promise(async (resolve, reject) => {
        try {
            let authorization = await config_headers();
            await axios.post(URL_API('backOfficeApi/LPADM04/CreateDataSurveyUser'), {
                "form_seq": row.form_seq,
                "register_type_seq_list": register_type_seq_list,
                "random_num_list": random_num_list
            }, authorization)
                .then(res => {
                    resolve(res.data);
                });
        }
        catch (err) {
            reject(err);
        }
        finally {

        }
    });
}

export const ADM07GetDataSurveyListByFormID = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let authorization = await config_headers();
            await axios.get(URL_API('backOfficeApi/LPADM04/GetDataSurveyListByFormID?form_seq=' + body.form_seq), authorization)
                .then(res => {
                    resolve(res.data);
                });
        }
        catch (err) {
            reject(err);
        }
        finally {

        }
    });
}

export const ADM07AddDataSurveyList = async (body) => {
    let survey_list = []
    survey_list.push(body)
    let _form = {
        "form_seq": body[0].form_seq,
        survey_list: [...body]
    }
    return new Promise(async (resolve, reject) => {
        try {
            let authorization = await config_headers();
            await axios.post(URL_API('backOfficeApi/LPADM04/AddSurveyList'), _form, authorization)
                .then(res => {
                    resolve(res.data);
                });
        }
        catch (err) {
            reject(err);
        }
        finally {

        }
    });
}