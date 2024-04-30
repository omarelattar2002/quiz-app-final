import { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import { getAllQuestions, createQuestion } from "../lib/ApiWrapper";
import { QuestionType, QuestionFormDataType, CategoryType } from "../types";
import Button from 'react-bootstrap/Button';
import QuestionForm from '../components/QuestionForm';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


type QuestionsProps = {isLoggedIn: boolean, flashMessage: (newMessage:string, newCategory:CategoryType) => void} //here


export default function Questions({isLoggedIn, flashMessage}: QuestionsProps) {

    const [questions, setQuestions] = useState<QuestionType[]>([])

    const [fetchQuestionData, setFetchQuestionData] = useState(true);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        async function fetchData(){
            const response = await getAllQuestions();
            if (response.data){
                let recievedQuestions = response.data['questions'];
                setQuestions(recievedQuestions)
            }
        }
        fetchData();
    }, [])

    const addNewQuestion = async (newQuestionData: QuestionFormDataType) => {
        const token = localStorage.getItem('token') || '';
        const response = await createQuestion(newQuestionData, token)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else if (response.data){
            flashMessage(`New Question has been created`, 'success')
            setShowForm(false);
            setFetchQuestionData(!fetchQuestionData)
        }
    }


  return (
    <>
        <Row>
            <Col>
                <h1 className='text-center mt-5'>All Questions</h1>
            </Col>
            {isLoggedIn && (
                <Col>
                    <Button className='w-100 mt-5' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Question+'}</Button>
                </Col>
            )
            }
        </Row>
        { showForm && <QuestionForm flashMessage={flashMessage} addNewQuestion={addNewQuestion}/> }
        {questions.map( q => <QuestionCard question={q}/> )}
    </>
  )
}