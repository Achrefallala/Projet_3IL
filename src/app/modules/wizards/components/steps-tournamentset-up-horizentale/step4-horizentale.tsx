import { FC } from "react";
import TeamModal from "../../../TeamModule/components/TeamModal";
import { useState } from "react";
import Team from "../../../TeamModule/components/Team";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { isString } from "formik";
import Button from '@mui/material/Button';


const Step4Horizentale: FC = () => {

    const [showTeamModal, setShowTeamModal] = useState(false);
    
    const handleCloseModal = () => setShowTeamModal(false);

    const teams = useSelector((state: any) => state.teams.teams);





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
                    <TeamModal open={showTeamModal} handleClose={handleCloseModal} />
                </Col>

            </Row>
            <Row>
                <Col style={{
                    marginLeft: '-45%',
                }}>
                    <Team />
                </Col>

            </Row >
        </Container >
    )
}

export { Step4Horizentale };