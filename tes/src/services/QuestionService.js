import {baseUrl} from '../services/globalVariables';
export const getQuestionsOfTemplate = (tid) => {
    return fetch(baseUrl+'/api/QuestionAnswers/' + tid, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const saveQuestion = (question) => {
    return fetch(baseUrl+'/api/questionanswers', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(question),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const delQuestion = (qid) => {
    return fetch(baseUrl+'/api/QuestionAnswers/' + qid, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export const updateQuestion = (id,question) => {
    return fetch(baseUrl+'/api/QuestionAnswers/' + id, {
        method: 'PUT',
        mode: 'cors',
        body:JSON.stringify(question),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

