import React from 'react';
import TeamCard from './TeamCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const MatchComponent = ({ match }) => {
    return (
        <Card sx={{ minWidth: 275, margin: 2 }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={5}>
                        <TeamCard team={match.team1} />
                    </Grid>

                    <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
                        <Typography sx={{ mb: 1 }}>{match.time ? new Date(match.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD'}</Typography>
                        <Typography variant="h5" sx={{ mb: 1 }}>VS</Typography>
                        {match.winner && <Typography sx={{ mt: 1 }}>Winner: {match.winner.name}</Typography>}
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <TeamCard team={match.team2} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MatchComponent;
