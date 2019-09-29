import {baseUrl} from '../services/globalVariables';

export const postGroup = (group) => {
    return fetch(baseUrl+"/api/Groups/",{
        method: 'POST',
        mode: 'cors',
        body:JSON.stringify(group),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const getGroups = () => {
    return fetch(baseUrl+"/api/Groups/",{
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const delGroup = (gid) => {
    return fetch(baseUrl+"/api/Groups/"+gid,{
        method: 'DELETE',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const populateStudentGroup = (criteria) => {
    return fetch(baseUrl+"/api/GroupStudents",{
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

export const getStudentsOfGroup = (gid) => {
    return fetch(baseUrl+"/api/GroupStudents/"+gid,{
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}


export const delStudentOfGroup = (gid,st) => {
    return fetch(baseUrl+"/api/GroupStudents/"+gid,{
        method: 'PUT',
        body:JSON.stringify(st),
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}




