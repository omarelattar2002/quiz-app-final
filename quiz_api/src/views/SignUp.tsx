import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { UserFormDataType, CategoryType } from '../types';
import { register } from '../lib/ApiWrapper';
import { useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';

type SignUpProps = {
    flashMessage: (newMessage:string|undefined, newCategory:CategoryType|undefined) => void
}

export default function SignUp({flashMessage}: SignUpProps) {
    const navigate = useNavigate();
    const [seePassword, setSeePassword] = useState(false);

    const [userRegistrationFormData, setUserRegistrationFormData] = useState<UserFormDataType>(
        {
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            confirm_password:''
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegistrationFormData({...userRegistrationFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(userRegistrationFormData);

        let response = await register(userRegistrationFormData);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            let newUser = response.data!
            flashMessage(`Congrats ${newUser.first_name} ${newUser.last_name}'s profile has been created!`, 'success')
            navigate('/login');
        }
        
    }

    
    const disableSubmit = userRegistrationFormData.password.length < 5 || userRegistrationFormData.password !== userRegistrationFormData.confirm_password

  return (
    <>
        <h1 className="text-center m-5">Register Now!</h1>
        <Card>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label htmlFor='first_name'>First Name</Form.Label>
                    <Form.Control className='mb-2' id='first_name' name='first_name' placeholder='Enter First Name' value={userRegistrationFormData.first_name} onChange={handleInputChange}/>
        
                    <Form.Label htmlFor='last_name'>Last Name</Form.Label>
                    <Form.Control className='mb-2' id='last_name' name='last_name' placeholder='Enter Last Name' value={userRegistrationFormData.last_name} onChange={handleInputChange}/>

                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control className='mb-2' id='email' name='email' type='email' placeholder='Enter Email' value={userRegistrationFormData.email} onChange={handleInputChange}/>

                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <InputGroup>
                        <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={userRegistrationFormData.password} onChange={handleInputChange}/>
                        <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? "bi bi-eye-slash" : "bi bi-eye"}></i></InputGroup.Text>
                    </InputGroup>

                    <Form.Label htmlFor='confirm_password'>Confirm Password</Form.Label>
                    <InputGroup>
                        <Form.Control id='confirm_password' name='confirm_password' type={seePassword ? 'text' : 'password'} placeholder='Confirm Password' value={userRegistrationFormData.confirm_password} onChange={handleInputChange}/>
                        <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? "bi bi-eye-slash" : "bi bi-eye"}></i></InputGroup.Text>
                    </InputGroup>

                    <Button disabled={disableSubmit} type='submit' variant='outline-primary' className='w-100 mt-3'>Register!</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}