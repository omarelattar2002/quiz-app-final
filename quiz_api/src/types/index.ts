
export type QuestionType = {
    question:string,
    answer:string,
    user:string,
    id:number,
}

export type UserFormDataType = {
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    confirm_password:string
}

export type QuestionFormDataType ={
    question:string,
    answer:string
}


export type UserType = {
    first_name:string,
    last_name:string,
    email:string,
    id:number,
    token:string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export type TokenType = {
    token:string,
    tokenExpiration:string
}