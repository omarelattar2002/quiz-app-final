import axios from 'axios';
import { QuestionType, UserFormDataType, UserType, TokenType, QuestionFormDataType } from "../types";


const baseURL:string = 'https://cae-bookstore.herokuapp.com'
const userEndpoint:string = '/user'
const questionAllEndpoint:string = '/question/all'
const loginEndpoint:string = '/login'
const questionEndpoint:string = '/question'


const apiClientNoAuth = () => axios.create({
    baseURL:baseURL
})

const apiClientBasicAuth = (email:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(email + ':' + password)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})


type APIResponse<T> = { //generic type T because data will be in all different kinds of responses
    data?:T,
    error?:string
}



async function getAllQuestions(): Promise<APIResponse<{'questions':QuestionType[]}>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(questionAllEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Uh Oh - Error!'
        }
    }
    return { data, error }
}

async function register(newUserData:UserFormDataType): Promise<APIResponse<UserType>> { //when it returns it will either be data or error and if it is data it will be UserType
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function login(email: string, password:string): Promise <APIResponse<TokenType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(email,password).get(loginEndpoint);
        data=response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error =err.response?.data.error
        } else {
            error= "Something went wrong"
        }
    }
    return { data, error }
}

async function editUser(token:string, editedUserData:Partial<UserType>): Promise <APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint, editedUserData);
        data=response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error =err.response?.data.error
        } else {
            error= "Something went wrong"
        }
    }
    return { data, error }
}

async function deleteUser(token:string): Promise <APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(userEndpoint);
        data=response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error =err.response?.data.error
        } else {
            error= "Something went wrong"
        }
    }
    return { data, error }
}

async function getMyQuestions(token:string): Promise<APIResponse<{'questions':QuestionType[]}> > { 
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(questionEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function createQuestion(questionData:QuestionFormDataType, token:string): Promise<APIResponse<QuestionFormDataType>> { 
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(questionEndpoint, questionData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function editQuestionById(id:number, questionData:Partial<QuestionType>, token:string): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(`${questionEndpoint}/${id}`, questionData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function deleteQuestionById(id:number, token:string): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(`${questionEndpoint}/${id}`);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}




export {
    getAllQuestions,
    register,
    login,
    editUser,
    deleteUser,
    getMyQuestions,
    createQuestion,
    editQuestionById,
    deleteQuestionById,


}