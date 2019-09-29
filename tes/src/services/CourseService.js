import {baseUrl} from '../services/globalVariables';
export const getAllCourses = () => {
    return fetch(baseUrl+"/api/Courses",{
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}