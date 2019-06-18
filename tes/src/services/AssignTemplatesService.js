import {baseUrl} from '../services/globalVariables';

export const getAssignedTemplates = () => {
    return fetch(baseUrl+'/api/TemplateTypes/',{
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });

    
}

export const updateAssignedTemplates = (templateType) => {
    return fetch(baseUrl+'/api/TemplateTypes/',{
        method: 'PUT',
        mode: 'cors',
        body:JSON.stringify(templateType),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });

    
}