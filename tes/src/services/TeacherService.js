import {baseUrl} from '../services/globalVariables';
export const getAllTeachers = () => {
    return fetch(baseUrl+"/api/Employee",{
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}