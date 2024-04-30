import { QuestionType, UserType } from "../types";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { Link } from "react-router-dom";


type QuestionCardProps = {
    question: QuestionType,
    currentUser?: Partial<UserType>
}


export default function QuestionCard({ question, currentUser }: QuestionCardProps) {

    const [showAnswer, setShowAnswer] = useState(false);

    const handleClick = () => {
        setShowAnswer(!showAnswer)
    };

    return (
        <Card className='m-10'>
            <Card.Header as="h5">Question</Card.Header>
            <Card.Body>
                <Card.Title>{question.question}</Card.Title>
                <Form.Label>Answer:</Form.Label>
                <Button className='m-10 w-100' variant={showAnswer ? "warning" : "primary"} onClick={handleClick}>{showAnswer ? `${question.answer}` : "Show Answer"}</Button>
                {currentUser !== question.user && (
                    <Link to={`/question/${question.id}`}><Button variant="warning">Edit Question</Button></Link>
                )}
            </Card.Body>
        </Card>
    )
}