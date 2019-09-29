import {baseUrl} from '../services/globalVariables';
export const postCustomEvaluation = (obj) => {
    return fetch(baseUrl+"/api/CustomEvaluation",{
        method: 'POST',
        body:JSON.stringify(obj),
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const endCustomEvaluation = (id) => {
    return fetch(baseUrl+"/api/CustomEvaluation/"+id,{
        method: 'DELETE',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const getAllCustomEvaluations = () => {
    return fetch(baseUrl+"/api/CustomEvaluation",{
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}