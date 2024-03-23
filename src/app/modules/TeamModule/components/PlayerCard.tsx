
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Cancel from '@mui/icons-material/Cancel';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { useNavigate } from 'react-router-dom';
import { deletePlayer } from '../../../../services/PlayerService';

import { setSubtitutes } from "../../../../redux/slices/subtitutesSlice";
import { useSelector } from 'react-redux';

import { selectSubtitute } from "../../../../redux/slices/subtitutesSlice";
import { useAppDispatch } from '../../../../redux/hooks/UseAppDispatch';
import Player from '../../../../models/Player';



function PlayerCard({ player }) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const selectedTeam = useSelector((state: any) => state.teams.selectedTeam);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        console.log("close")
        setAnchorEl(null);
    };

    const [currentPlayer, setCurrentPlayer] = React.useState(null);
    const subtitutes = useSelector((state: any) => state.subtitutes.subtitutes);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleEditClick = (player: any) => {
        setCurrentPlayer(player);
        dispatch(selectSubtitute(player));
        // navigate('/metronic8/react/demo1/editPlayer', { state: { player } });
    };


    const handleDelete = (id: string) => {
        deletePlayer(id);
        const subtitutesClone = subtitutes.filter((player: Player) => player._id !== id);
        console.log("after delete ", subtitutes)
        dispatch(setSubtitutes(subtitutesClone));
    };


    return (

        <>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem
                    onMouseDown={(event) => {
                        event.preventDefault();
                        handleClose()
                        handleEditClick(player)
                    }}>
                    <ListItemIcon>
                        <DriveFileRenameOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>



                <MenuItem>
                    <ListItemIcon>
                        <GroupRemoveIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText>Remove</ListItemText>

                </MenuItem>

                <MenuItem onMouseDown={() => handleDelete(player._id)}>
                    <ListItemIcon>
                        <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem onMouseDown={handleClose}>
                    <ListItemIcon>
                        <Cancel fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cancel</ListItemText>
                </MenuItem>
            </Menu>
            <div
                className="container text-white player-card"
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onContextMenu={(event) => {
                    event.preventDefault();
                    handleClick(event);
                }}

                style={{
                    height: "fit-content",
                }}>
                <div className="row">
                    <div className="col-4">
                        <div className="player-position">
                            <span>{player.position}</span>
                        </div>
                        <div>
                            <img className="img-fluid" src={`https://flagsapi.com/${player.country}/flat/64.png`} alt="country Flag" />
                        </div>
                        <div>
                            <img className="img-fluid" src={selectedTeam.logo} alt="Barcelona Logo" />
                        </div>
                    </div>
                    <div className="col-8">
                        <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/${player.avatar.replace('\\', '/')}`} alt="Messi" draggable="false" />

                        {/* <img className="img-fluid" src="https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg" alt="Barcelona Logo" /> */}
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-auto player-name">
                        <span>{`${player.firstName} ${player.lastName}`}</span>
                    </div>
                </div>
                <div className="row">
                    <hr />
                    <div className="col-12">
                        Age: {player.age}
                    </div>


                    <div className="col-12">
                        Height: {player.height}
                    </div>

                </div>
            </div>


        </>
    )
}

export default PlayerCard;