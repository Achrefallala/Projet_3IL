import TeamModal from "./components/TeamModal";
import { useState } from "react";
import Team from "./components/Team";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { isString } from "formik";
import Button from '@mui/material/Button';

function ManagePlayers() {

    const [showTeamModal, setShowTeamModal] = useState(false);

    const handleCloseModal = () => setShowTeamModal(false);


    return (
        <Container fluid="md">

            <Row className="d-flex">

                <Col>
                    <Button
                        onClick={() => setShowTeamModal(true)}
                        variant="outlined">
                        Browse teams
                    </Button>
                    <TeamModal open={showTeamModal} handleClose={handleCloseModal} />
                </Col>

            </Row>
            <Row>
                <Col>
                    <Team />
                </Col>

            </Row >
        </Container >
    )

}

export default ManagePlayers;