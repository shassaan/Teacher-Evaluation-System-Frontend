import {baseUrl} from '../services/globalVariables';

export const getOptionsOfTemplate = (tid) => {
    return fetch(baseUrl+"/api/Options/"+tid,{
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}


export const saveOption = (option) => {
    return fetch(baseUrl+"/api/Options/",{
        method: 'POST',
        mode: 'cors',
        body:JSON.stringify(option),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}


export const deleteOption = (id) => {
    return fetch(baseUrl+"/api/Options/"+id,{
        method: 'DELETE',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}