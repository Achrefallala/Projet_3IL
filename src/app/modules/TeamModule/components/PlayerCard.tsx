
import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentPaste from '@mui/icons-material/ContentPaste';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Cancel from '@mui/icons-material/Cancel';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { useNavigate } from 'react-router-dom';



function PlayerCard({ player }) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        console.log("close")
        setAnchorEl(null);
    };

    const [currentPlayer, setCurrentPlayer] = React.useState(null);

    const navigate = useNavigate();

    const handleEditClick = (player: any) => {
        setCurrentPlayer(player);
        navigate('editPlayer', { state: { player } });
    };




    //console.log(`${process.env.REACT_APP_API_URL}/${player.avatar}`)
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

                <MenuItem>

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
                onMouseDown={() => console.log("mouse down")}

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
                            <img className="img-fluid" src="https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg" alt="Barcelona Logo" />
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