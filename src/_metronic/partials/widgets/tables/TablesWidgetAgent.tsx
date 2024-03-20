import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const socket = io('http://localhost:3002');

type Match = {
  _id: string;
  team1Name: string;
  team1Logo: string;
  team2Name: string;
  team2Logo: string;
  divisionName: string;
  time: string;
  scoreTeam1: number;
  scoreTeam2: number;
  matchStatus: string;
  cardCounts: { yellow: number; red: number };
};

const TablesWidgetAgent: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 5;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:3001/match/matches');
        const formattedMatches = response.data.map((match: any) => ({
          ...match,
          matchStatus: 'En cours',
          cardCounts: { yellow: 0, red: 0 },
        }));
        setMatches(formattedMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();

    socket.on('scoreUpdated', (updatedMatch: Match) => {
      setMatches(currentMatches =>
        currentMatches.map(match =>
          match._id === updatedMatch._id ? { ...match, ...updatedMatch } : match
        )
      );
    });

    socket.on('matchStatusUpdated', ({ _id, status }) => {
      setMatches(currentMatches =>
        currentMatches.map(match =>
          match._id === _id ? { ...match, matchStatus: status } : match
        )
      );
    });

    socket.on('cardStatusUpdated', ({ _id, yellow, red }) => {
      setMatches(currentMatches =>
        currentMatches.map(match =>
          match._id === _id ? { ...match, cardCounts: { yellow, red } } : match
        )
      );
    });

    return () => {
      socket.off('scoreUpdated');
      socket.off('matchStatusUpdated');
      socket.off('cardStatusUpdated');
    };
  }, []);

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {currentMatches.map((match, index) => (
        <div key={index} className="card mt-4" style={{ boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col text-center">
                <img src={`http://localhost:3001/${match.team1Logo}`} alt={match.team1Name} style={{ width: '100px', height: '100px' }} />
                <div className="mt-2"><strong>{match.team1Name}</strong></div>
              </div>
              <div className="col text-center">
                <h5 className="card-title">VS</h5>
                <p className="card-text"><small className="text-muted">{match.divisionName}</small></p>
                <p className="card-text">{new Date(match.time).toLocaleString()}</p>
                <p>Score: {match.scoreTeam1} - {match.scoreTeam2}</p>
                <p>Statut du match: {match.matchStatus}</p>
                <p>Cartons jaunes: {match.cardCounts.yellow}</p>
                <p>Cartons rouges: {match.cardCounts.red}</p>
              </div>
              <div className="col text-center">
                <img src={`http://localhost:3001/${match.team2Logo}`} alt={match.team2Name} style={{ width: '100px', height: '100px' }} />
                <div className="mt-2"><strong>{match.team2Name}</strong></div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Stack spacing={2} justifyContent="center" alignItems="center" mt={4}>
        <Pagination count={Math.ceil(matches.length / matchesPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
      </Stack>
    </div>
  );
};

export { TablesWidgetAgent };
