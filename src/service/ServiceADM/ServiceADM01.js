import { config_headers } from '../Config';
import requests from '../httpServices';

const ADM01Services = {
    GetDataList(body, headers) {
        return requests.get('backOfficeApi/LPASM01/Get', body, headers);
    },
    CreateData(body, headers) {
        return requests.post('backOfficeApi/LPASM01/Add', body, headers);
    },
    UpdateData(body, headers) {
        return requests.put('backOfficeApi/LPASM01/Update', {
            "register_type_seq": body.register_type_seq,
            "register_type_name": body.register_type_name,
            "register_type_ord": body.register_type_ord,
            "remark": body.remark,
            "record_status": body.record_status,
        }, headers);
    },
    CancelData(body) {
        let authorization = config_headers();
        return requests.delete('backOfficeApi/LPASM01/Delete', {}, {
            data: {
                "register_type_seq": body.register_type_seq,
                "record_status": body.record_status
            }, headers: authorization.headers
        });
    },
    UpdateUpOrDownData(body, headers) {
        let arr = [];
        body.forEach(element => {
            arr.push(element.register_type_seq);
        });
        return requests.put('backOfficeApi/LPASM01/UpdateOrder', {
            "order_seq_list": arr
        }, headers);
    },
};

export default ADM01Services;