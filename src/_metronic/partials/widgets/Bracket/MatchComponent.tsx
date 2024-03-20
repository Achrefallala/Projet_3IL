import React from 'react';
import TeamCard from './TeamCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const MatchComponent = ({ match }) => {
    // Determine the match outcome for each team
    const team1Outcome = match.winner && match.team1 && match.winner._id === match.team1._id ? 'winner' : match.winner ? 'lost' : null;
    const team2Outcome = match.winner && match.team2 && match.winner._id === match.team2._id ? 'winner' : match.winner ? 'lost' : null;

    // Format the date and time
    const dateTime = match.time ? new Date(match.time) : null;
    const dateStr = dateTime ? dateTime.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'TBD';
    const timeStr = dateTime ? dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    return (
        <Card sx={{ width: '100%', maxWidth: 800, margin: 'auto', mt: 2, mb: 2 ,
        borderWidth: 1, // Optional: You can adjust the border width
        borderStyle: 'solid', // Necessary to show the border
        borderColor: 'black', // Example: A blue color. Adjust the color code to match your design
      }}>
        <CardContent>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={5} md={4} lg={5}>
                    <TeamCard team={match.team1} matchOutcome={team1Outcome} />
                </Grid>
                <Grid item xs={12} sm={2} md={4} lg={2} sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    mt: { xs: 2, sm: 0 },
                    px: { xs: 1, sm: 0 } // Apply horizontal padding on xs screens to reduce side margins
                }}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>VS</Typography>
                    <Typography sx={{ textAlign: 'center', mt: 1 }}>
                        {dateStr}
                        <br />
                        {timeStr}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={5} md={4} lg={5}>
                    <TeamCard team={match.team2} matchOutcome={team2Outcome} />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    );
};

export default MatchComponent;
