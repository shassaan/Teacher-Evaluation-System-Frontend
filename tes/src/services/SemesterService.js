import {baseUrl} from '../services/globalVariables';
export const getAllSemesters = () => {
    return fetch(baseUrl+'/api/Semesters', {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}