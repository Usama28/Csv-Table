import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Form, Button, Row, Col, Container } from 'reactstrap';

const Login = () => {
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if(username === "dearTakota" && password === "HelloWorld@123") {
            history.push("/table");
        }
        else {
            alert("Invalid credentials");
            window.location.reload();
        }
    }

    return (
        <div className="login-bg">

        
        <Container>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Row>
                    <Col xs="12">
                        <h5 className="text-center">Login to see the TDP Data</h5>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs="12">
                        <Input type="text" id="username" placeholder="Enter username" />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="12">
                        <Input type="password" id="password" placeholder="Enter password" />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="12">
                        <Button type="submit" color="primary" block>Sign In</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
        </div>
    )
}

export default Login
