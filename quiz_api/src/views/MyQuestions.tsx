import { useState, useEffect } from 'react';
import { UserType, CategoryType, QuestionType } from '../types';
import { getMyQuestions } from '../lib/ApiWrapper';
import QuestionCard from '../components/QuestionCard';


type MyQuestionsProps = {
    isLoggedIn: boolean,
    currentUser: Partial<UserType>,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void

}


export default function MyQuestions({currentUser}: MyQuestionsProps) {

    const [questions, setQuestions] = useState<QuestionType[]>([])

    

    useEffect(() => {
        const token = localStorage.getItem('token');
        async function fetchData() {
            const response = await getMyQuestions(token!);
            if (response.data) {
                let questions = response.data['questions'];
                setQuestions(questions)
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <h1 className='text-center' >My Questions</h1>
            {questions.map((q) => (<QuestionCard question={q} currentUser={currentUser} />))}
        </>
    )
}