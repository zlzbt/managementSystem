import { request } from "umi";
export async function requestPost(paramObj: {api:string, method:string, data:object, options:any}){
    return request(paramObj.api, {...paramObj, ...(paramObj.options || {})})
}
