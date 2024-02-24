import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../auth";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface Team {
    _id: string;
    name: string;
    logo: string;
    location: string;
    division: string;
}

const MatchConfig = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<{team1?: Team, team2?: Team}>({});
    const [numberTeams, setNumberTeams] = useState<number>(0);  

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/division/division/teams/${id}`, {
                    headers: {
                      Authorization: `Bearer ${auth?.api_token}`
                    }
                  });
                setTeams(response.data);
                setNumberTeams(response.data.length);
                

            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    console.log(numberTeams)

    const handleSelectTeam = (team: Team, teamKey: string) => {
        setSelectedTeams(prevState => ({...prevState, [teamKey]: team}));
    }

    const numberOfMatches = Math.floor(numberTeams / 2);

    const getAvailableTeams = (teamKey: string) => {
        return teams.filter(team => !Object.values(selectedTeams).some(selectedTeam => selectedTeam._id === team._id && selectedTeam !== selectedTeams[teamKey]));
    }

    return (
        <>
        
        
            {[...Array(numberOfMatches)].map((_, matchIndex) => (
                <div className="card mt-9">
                <div className="card-body">
                <div key={matchIndex}>
                    <div className="row align-items-center">
                        <div className="col">
                            <Autocomplete
                                id={`combo-box-demo-${matchIndex}-1`}
                                options={getAvailableTeams(`team1-${matchIndex}`)}
                                getOptionLabel={(option) => option.name}
                                style={{ width: 320 }}
                                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={`${process.env.REACT_APP_API_URL}/${option.logo.replace(/\\/g, '/')}`} alt={option.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                                            <div>
                                              <div>{option.name}</div> 
                                                <div style={{ fontSize: '0.8em', color: '#888' }}>{option.location}</div>
                                            </div>
                                        </div>
                                    </li>
                                )}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        handleSelectTeam(newValue, `team1-${matchIndex}`);
                                    }
                                }}
                                className="ms-9"
                            />
                            <br />
                            {selectedTeams[`team1-${matchIndex}`] && (
                                <div className="text-center">
                                    <img src={`${process.env.REACT_APP_API_URL}/${selectedTeams[`team1-${matchIndex}`].logo}`} alt={selectedTeams[`team1-${matchIndex}`].name} className="img-fluid mb-3 rounded-circle" style={{ width: '100px', height: '100px' }} />
                                     <strong> <p className="mb-0">{selectedTeams[`team1-${matchIndex}`].name}</p> </strong>
                                    <p className="text-muted">{selectedTeams[`team1-${matchIndex}`].location}</p>
                                </div>
                            )}
                        </div>
                        <div className="col">
                            <h2 className="text-center">VS</h2>
                        </div>
                        <div className="col">
                            <Autocomplete
                                id={`combo-box-demo-${matchIndex}-2`}
                                options={getAvailableTeams(`team2-${matchIndex}`)}
                                getOptionLabel={(option) => option.name}
                                style={{ width: 320 }}
                                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={`${process.env.REACT_APP_API_URL}/${option.logo.replace(/\\/g, '/')}`} alt={option.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                                            <div>
                                                <div>{option.name}</div>
                                                <div style={{ fontSize: '0.8em', color: '#888' }}>{option.location}</div>
                                            </div>
                                        </div>
                                    </li>
                                )}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        handleSelectTeam(newValue, `team2-${matchIndex}`);
                                    }
                                }}
                            /> <br />
                            {selectedTeams[`team2-${matchIndex}`] && (
                                <div className="text-center">
                                    <img src={`${process.env.REACT_APP_API_URL}/${selectedTeams[`team2-${matchIndex}`].logo}`} alt={selectedTeams[`team2-${matchIndex}`].name} className="img-fluid mb-3 rounded-circle" style={{ width: '100px', height: '100px' }}/>
                                    <strong><p className="mb-0">{selectedTeams[`team2-${matchIndex}`].name}</p></strong>
                                        <p className="text-muted">{selectedTeams[`team2-${matchIndex}`].location}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr />
                    </div>
                    </div>
                    
                    </div>
                ))}
            
        
        </>
    );
}
export default MatchConfig;