import axios from 'axios';
import { config_headers, URL_API, config_headers_fromData } from '../Config';
import { formatDateAPI } from '../../utils/DateUtil';

export const ADM10GetDataList = async (body) => {

    let data = {
        "otp_dtm_from": body.otp_dtm_from === "" || body.otp_dtm_from === undefined ? "" : formatDateAPI(body.otp_dtm_from, false),
        "otp_dtm_to": body.otp_dtm_to === "" || body.otp_dtm_to === undefined ? "" : formatDateAPI(body.otp_dtm_to, false),
    }

    return new Promise(async (resolve, reject) => {
        try {
            let authorization = await config_headers();
            await axios.post(URL_API('backOfficeApi/LPADM06/Get'), data, authorization)
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

