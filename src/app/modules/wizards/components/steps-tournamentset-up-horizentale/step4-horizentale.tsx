import { FC } from "react";

import { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";

import { isString } from "formik";
import Button from '@mui/material/Button';


const Step4Horizentale: FC = () => {

    const [showTeamModal, setShowTeamModal] = useState(false);
    
    const handleCloseModal = () => setShowTeamModal(false);

    





    return (
        <Container fluid="md">

            <Row className="d-flex">

                <Col
                    style={{
                        marginLeft: '-45%',
                    }}>
                    <Button
                        onClick={() => setShowTeamModal(true)}
                        variant="outlined">
                        Browse teams
                    </Button>
                    
                </Col>

            </Row>
            
        </Container >
    )
}

export { Step4Horizentale };