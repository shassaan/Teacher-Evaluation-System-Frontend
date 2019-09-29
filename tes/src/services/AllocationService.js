import {baseUrl} from '../services/globalVariables';
export const getAlloc = (criteria) => {
    return fetch(baseUrl+'/api/Allocations', {
        method: 'POST',
        body:JSON.stringify(criteria),
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}