import { QuestionFormDataType, CategoryType } from "../types";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

type QuestionFormProps = {
    addNewQuestion: (data: QuestionFormDataType) => void
    flashMessage: (newMessage:string, newCategory:CategoryType) => void
}


export default function QuestionForm({addNewQuestion, flashMessage}: QuestionFormProps) {

    const [newQuestion, setNewQuestion] = useState<QuestionFormDataType>({question: '', answer: ''});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewQuestion({...newQuestion, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewQuestion(newQuestion)
        flashMessage('Question added!', 'success');
    }

  return (
    <Card className='my-5'>
            <Card.Body>
                <h3 className="text-center">Create New Question</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Question Title</Form.Label>
                    <Form.Control name='question' placeholder='Enter New Question' value={newQuestion.question} onChange={handleInputChange} />
                    <Form.Label>Answer</Form.Label>
                    <Form.Control as='textarea' name='answer' placeholder='Enter Answer' value={newQuestion.answer} onChange={handleInputChange} />
                    <Button className='mt-3 w-100' variant='success' type='submit'>Create Question</Button>
                </Form>
            </Card.Body>
        </Card>
  )
}