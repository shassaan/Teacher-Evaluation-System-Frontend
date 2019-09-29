import {baseUrl} from '../services/globalVariables';
export const login = (creds) => {
    return fetch(baseUrl+"/api/Login",{
        method: 'POST',
        body:JSON.stringify(creds),
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}