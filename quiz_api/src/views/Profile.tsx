import { CategoryType, UserFormDataType } from "../types";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { editUser, deleteUser } from "../lib/ApiWrapper";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type ProfileProps = {
    logUserOut: () => void,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void
}


export default function Profile({logUserOut, flashMessage}: ProfileProps) {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const [editUserData, setEditUserData] = useState<Partial<UserFormDataType>>({
        first_name: '',
        last_name: '',
        email: '',
        password:'',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUserData({...editUserData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let response = await editUser(localStorage.getItem("token")!, editUserData);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage("User has been updated", 'success')
            navigate('/question/all')
        }
    }

    const handleDelete = async()=> {
        const token=localStorage.getItem('token') || '';
        const response=await deleteUser(token)
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`This user has been deleted`, 'success')
            logUserOut()
            navigate('/') 
        }
    }


  return (
    <>
        <h1 className="text-center m-5">Edit Account Info Here!</h1>
        <Card>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label htmlFor='first_name'>First Name</Form.Label>
                    <Form.Control className='mb-2' id='first_name' name='first_name' placeholder='Enter First Name' value={editUserData.first_name} onChange={handleInputChange}/>
        
                    <Form.Label htmlFor='last_name'>Last Name</Form.Label>
                    <Form.Control className='mb-2' id='last_name' name='last_name' placeholder='Enter Last Name' value={editUserData.last_name} onChange={handleInputChange}/>

                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control className='mb-2' id='email' name='email' type='email' placeholder='Enter New Email' value={editUserData.email} onChange={handleInputChange}/>

                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <InputGroup>
                        <Form.Control id='password' name='password' type='text' placeholder='Enter New Password' value={editUserData.password} onChange={handleInputChange}/>
                    </InputGroup>
                    <Row>
                        <Col>
                            <Button className='w-50' type='submit' variant='outline-primary' >Update Profile</Button>
                        </Col>
                        <Col>
                            <Button className='w-50' variant='danger' onClick={openModal}>Delete Profile</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
        <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {editUserData.first_name}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {editUserData.first_name}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDelete}>Delete User</Button>
                </Modal.Footer>
        </Modal>
    </>
  )
}