import {baseUrl} from '../services/globalVariables';
export const simpleBarChartData = (criteria) => {
    return fetch(baseUrl+'/api/Reports', {
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

export const getBestTeacher = (qid) => {
    return fetch(baseUrl+'/api/Reports/getBestTeacher/'+qid, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const worstTeacherWithTiming = () => {
    return fetch(baseUrl+'/api/Reports/worstTeacherWithTiming/', {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const getPoorTeacher = (qid) => {
    return fetch(baseUrl+'/api/Reports/getPoorTeacher/'+qid, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const groupedBarChartTeacherData = (criteria) => {
    return fetch(baseUrl+'/api/Reports/GetGroupedBarChartTeacher', {
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


export const groupedBarChartCourseData = (criteria) => {
    return fetch(baseUrl+'/api/Reports/GetGroupedBarChartCourse', {
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