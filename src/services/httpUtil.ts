import { request } from "umi";

export async function httpPost(paramObj: {api:string, data:object, options:any}){
    return request(paramObj.api, {...paramObj, method: 'POST', ...(paramObj.options || {})})
}

export async function httpGet(paramObj: {api:string, data:object, options:any}){
    return request(paramObj.api, {...paramObj, method: 'GET',  ...(paramObj.options || {})})
}
