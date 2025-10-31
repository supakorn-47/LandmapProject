import requests from "../httpServicesLog";
import { URL_API } from "../Config";

const MSM03Services = {
  GetDataList(body, headers) {
    return requests.post("apiLog/LogService/GetList", body, headers);
  },
};

export default MSM03Services;
