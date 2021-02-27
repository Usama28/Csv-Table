import React from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Card, CardBody, Row, Col, CardHeader, Container, Button } from 'reactstrap';


const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
    {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 93, 30, 71, 79, 70, 60, 50, 30, 10],
    },
],
};

const options = {
    tooltips: {
        enabled: false,
        // custom: CustomTooltips
    },
    maintainAspectRatio: false,
}


const Charts = () => {
    
    return (
    <Container className="animated fadeIn mt-5">
        <Row>
            <Col xs="12">
                <Card>
                    <CardHeader>
                        Live TDP Data
                    </CardHeader>
                    <CardBody>
                    <div className="chart-wrapper" style={{height: '60vh'}}>
                        <Line data={line} options={options} />
                    </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>

        <Row className="mt-3">
            <Col xs="2">
                <Link to="/table">
                    <Button color="primary" block>View Table</Button>
                </Link>
            </Col>
        </Row>
    </Container>
    );
}


    export default Charts;