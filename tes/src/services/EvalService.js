import {baseUrl} from '../services/globalVariables';
export const postEvaluation = (data) => {
    return fetch(baseUrl+"/api/Eval",{
        method: 'POST',
        body:JSON.stringify(data),
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}