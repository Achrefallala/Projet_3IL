import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { toAbsoluteUrl } from '../../../helpers';

const TeamCard = ({ team }) => {
    const placeholderLogo = toAbsoluteUrl('/media/custom icon/na.jpg');
    const logoPath = team?.logo ? `${process.env.REACT_APP_API_URL}/${team.logo}` : placeholderLogo;

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 150, textAlign: 'center', padding: '10px' }}>
            <CardMedia
                component="img"
                sx={{ width: 60, height: 60, mb: 1 }} // Adjust logo size as needed
                image={logoPath}
                alt={`${team?.name || 'TBD'} Logo`}
            />
            <CardContent sx={{ padding: '8px' }}>
                <Typography variant="subtitle1" component="div" sx={{ fontSize: '1.1rem' , fontWeight:'bold' }}>
                    {team?.name || 'TBD'}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                     {team?.location || 'N/A'}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' , fontWeight:'fontWeightMedium' }}>
                    Division: {team?.division || 'N/A'}
                </Typography>
                
            </CardContent>
        </Card>
    );
};

export default TeamCard;
