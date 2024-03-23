import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { selectTeam, useAppDispatch } from '../../../../redux/slices/teamsSlice';

// import "./Team.css";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default function TeamModal(props) {

    const selectedTeam = useSelector((state: any) => state.teams.selectedTeam);

    const teams = useSelector((state: any) => state.teams.teams);

    const dispatch = useAppDispatch();

    const handleSelectTeam = (team) => {
        dispatch(selectTeam(team));
    }

    const modalStyle = {
        border: "#0ddc14 solid 2px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Choose a team to setup players</DialogTitle>
            <DialogContent>
                {teams.map((option: any) => (

                    <Card
                        style={selectedTeam == option ? modalStyle : {}}
                        role="button"
                        onClick={() => handleSelectTeam(option)}
                        className="pe-auto my-3">
                        <CardHeader
                            title={"Team name: " + option.name}
                            subheader={"Location: " + option.location}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={option.logo}
                            alt="Paella dish"
                        />

                    </Card>

                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog >
    );
}