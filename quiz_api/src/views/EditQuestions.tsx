import { useState } from 'react';
import { useNavigate,  useParams } from 'react-router-dom';
import {editQuestionById, deleteQuestionById } from '../lib/ApiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap//Modal';
import { CategoryType, QuestionFormDataType} from '../types';


type EditQuestionProps = {
    flashMessage: (message:string, category:CategoryType) => void
}


export default function EditQuestion({flashMessage}: EditQuestionProps) {

    const { questionId } = useParams();
    const navigate = useNavigate();

    const [questionToEditData, setQuestionToEditData] = useState<QuestionFormDataType>( { question: '', answer: '' } );   

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionToEditData({...questionToEditData, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editQuestionById(parseInt(questionId!), questionToEditData, token);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`Your question has been updated`, 'success');
            navigate('/question')
        }
    }

    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deleteQuestionById(Number(questionId!), token);
        if (response.error) {
            flashMessage(response.error, 'danger');
        } else {
            flashMessage('Question Deleted', 'success');
            navigate('/question')
        }
    }

  return (
    <>
            <Card className='my-3'>
                <Card.Body>
                    <h3 className="text-center">Edit Question</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control name='question' placeholder='Edit Question' value={questionToEditData.question} onChange={handleInputChange} />
                        <Form.Label>Post Body</Form.Label>
                        <Form.Control as='textarea' name='answer' placeholder='Edit Answer' value={questionToEditData.answer} onChange={handleInputChange} />
                        <Button className='mt-3 w-100' variant='info' type='submit'>Edit Question</Button>
                        <Button className='mt-3 w-100' variant='danger' onClick={openModal}>Delete Question</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {questionToEditData.question}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this question? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Post</Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}