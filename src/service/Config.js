import { setSession, getSession } from '../utils/Crypto';

export const config_headers = async () => {
    try {
        return { headers: { Authorization: "Bearer " + await getSession("login").result.token } };
    } catch (error) {

    }
}

export const config_headers_fromData = async (fromData) => {
    try {
        return { headers: { Authorization: "Bearer " + await getSession("login").result.token, 'Content-Type': 'multipart/form-data' } };
    } catch (error) {
        return undefined;
    }
}

export const config_headers_delete = async (params) => {
    try {
        return { data: params, headers: { Authorization: "Bearer " + await getSession("login").result.token } };
    } catch (error) {
        return undefined;
    }
}
export const URL_API = (API) => {
    let URL = "";
    // if (window.location.protocol === "http:") {
    //     URL = `${process.env.REACT_APP_URL_API_WEB}/`;
    // }

    
    if (window.location.host === 'localhost:50000' || window.location.host === 'sitdev.dyndns.org:9267') {
        URL = `${process.env.REACT_APP_URL_API_WEB}/`;
    } else if (window.location.host === '172.16.43.203:30002' || window.location.host === 'mylandsintra.dol.go.th') {
        URL = `${process.env.REACT_APP_URL_API_WEB_PROD}/`;
    }

    //console.log('URL_API', URL + API);

    return URL + API;
}

export const URL_API_EXPORT = (API) => {
    let URL = "";
    // URL = `${process.env.REACT_APP_URL_API_EXPORT}/`;
    if (window.location.host === 'localhost:50000' || window.location.host === '172.16.43.182:30004') {
        URL = `${process.env.REACT_APP_URL_API_EXPORT}/`;
    } else if (window.location.host === '172.16.43.203:30002') {
        URL = `${process.env.REACT_APP_URL_API_EXPORT_PROD}/`;
    }
    return URL + API;
}

export const URL_API_LOG = (API) => {
    let URL = "";
    // URL = `${process.env.REACT_APP_URL_API_LOG}/`;
    if (window.location.host === 'localhost:50000' || window.location.host === '172.16.43.182:30004') {
        URL = `${process.env.REACT_APP_URL_API_LOG}/`;
    } else if (window.location.host === '172.16.43.203:30002') {
        URL = `${process.env.REACT_APP_URL_API_LOG_PROD}/`;
    }
    return URL + API;
}
