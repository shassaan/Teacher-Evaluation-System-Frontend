import {baseUrl} from '../services/globalVariables';
export const getTemplates = () => {
    return fetch(baseUrl+'/api/templates', {
            method: 'GET',
            mode:'cors',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
            }
        });
}

export const postTemplate = (template) => {
    return fetch(baseUrl+'/api/templates', {
        method: 'POST',
        mode:'cors',
        body:JSON.stringify(template),
        headers: {
            Accept:'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
        }
    });
}

export const getTemplateOf = (id) => {
    return fetch(baseUrl+'/api/templates/'+id, {
        method: 'GET',
        mode:'cors',
        headers: {
            Accept:'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
        }
    });
}

