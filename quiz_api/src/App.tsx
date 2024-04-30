import Navigation from "./components/Navigation";
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Questions from "./views/Questions";
import SignUp from "./views/SignUp";
import Login from './views/Login';
import { useEffect, useState } from 'react';
import { CategoryType, UserType } from "./types";
import AlertMessage from "./components/AlertMessage";
import Profile from "./views/Profile";
import Home from "./views/Home";
import MyQuestions from "./views/MyQuestions";
import EditQuestion from "./views/EditQuestions";


export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('token') ? true : false)
    const [currentUser, setCurrentUser] = useState<Partial<UserType>>({
        email: '',
        first_name: '',
        last_name: '',
        id: NaN,
        token: ''
    })

    const [message, setMessage] = useState<string|undefined>(undefined)
    const [category, setCategory] = useState<CategoryType|undefined>(undefined)

    useEffect(() => {
        async function getCurrentUser(){
            if (isLoggedIn){
                setCurrentUser({
                    email: localStorage.getItem('email')!,
                    first_name: localStorage.getItem('first_name')!,
                    last_name: localStorage.getItem('last_name')!,
                    token: localStorage.getItem('token')!,
                    id: parseInt(localStorage.getItem('user_id')!),
                })
            }
        }
        getCurrentUser()
    }, [isLoggedIn])


    const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
        setMessage(newMessage);
        setCategory(newCategory);
        setTimeout(() => {
            if (newMessage && newCategory){
                flashMessage(undefined, undefined)
            }
        }, 5000)
    }

    const logUserIn = () => {
        setIsLoggedIn(true)
    }

    const logUserOut = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        console.log("You have been logged out")
      }


    return (
        <>
            <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut} />
            <Container>
                {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
                <Routes>
                    <Route path='/question/all' element={<Questions isLoggedIn={isLoggedIn} flashMessage={flashMessage}/>} />
                    <Route path='/signup' element={<SignUp flashMessage={flashMessage} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/>} ></Route>
                    <Route path='/profile' element={<Profile logUserOut={logUserOut} flashMessage={flashMessage}/>} ></Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/question" element={<MyQuestions isLoggedIn={isLoggedIn} currentUser={currentUser} flashMessage={flashMessage} />}></Route>
                    <Route path="/question/:questionId" element={<EditQuestion flashMessage={flashMessage}  />} ></Route>
                </Routes>
            </Container>

        </>
  )
}


