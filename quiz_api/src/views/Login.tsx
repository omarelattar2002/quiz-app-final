import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { UserFormDataType, CategoryType } from '../types';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/ApiWrapper';



type LoginProps = {
    logUserIn: () => void,
    flashMessage: (newMessage:string|undefined, newCategory:CategoryType|undefined) => void,
}


export default function Login({logUserIn, flashMessage}: LoginProps) {

    const navigate = useNavigate();

    const [userData, setUserData] = useState<Partial<UserFormDataType>>(
        {
            email: '',
            password: '',
        }
    )

    const [seePassword, setSeePassword] = useState(false);



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, [e.target.name]: e.target.value })
    }



  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await login(userData.email!, userData.password!)
    if (response.error){
        flashMessage(response.error, 'danger')
    } else {
        const token = response.data!.token;
        localStorage.setItem('token', token);
        logUserIn();
        flashMessage(response.data?.token, 'success');
        navigate('/')
    }
}

  return (
    <>
            <h1 className="text-center mt-5 mb-5">Log In Here</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control id='email' name='email' placeholder='Enter Email' value={userData.email} onChange={handleInputChange}/>

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={userData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3'>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
  )
}