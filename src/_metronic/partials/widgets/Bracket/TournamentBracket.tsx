import React, { useEffect, useState } from 'react';
import MatchComponent from './MatchComponent';
import { Match } from './MatchModel';


interface TournamentBracketProps {
  matches: Match[];
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({ matches }) => {
  const [updatedMatches, setUpdatedMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Copy the matches to a new array to prevent direct state mutation
    let updatedMatches = [...matches];

    // Function to find and update a match by ID
        const updateMatchTeams = (matchId: string, winner: { _id: string; name: string }) => {
            const matchIndex = updatedMatches.findIndex(match => match._id === matchId);
            if (matchIndex !== -1) {
            // Check if team1 is null or not set, and set it to winner if so
            if (!updatedMatches[matchIndex].team1) {
                updatedMatches[matchIndex].team1 = winner;
            } else if (!updatedMatches[matchIndex].team2) { // Otherwise, set team2 to winner if team1 is already occupied
                updatedMatches[matchIndex].team2 = winner;
            }
            // Note: If both team1 and team2 are already set, this does nothing. You may want to add logic to handle unexpected scenarios.
            }
        };
  

    // Loop through matches to find winners and update the next matches accordingly
    updatedMatches.forEach(match => {
        if (match.winner) {
            updateMatchTeams(match.nextMatchId as string, match.winner);
        }
    });

    setUpdatedMatches(updatedMatches);
  }, [matches]);

  const rounds = updatedMatches.reduce((acc: Record<string, Match[]>, match) => {
    const round = match.round.toString();
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(match);
    return acc;
  }, {});


  return (
    <div style={{ width: 'auto', height: '600px', overflow: 'auto', whiteSpace: 'nowrap' }}>
      {Object.keys(rounds).map((round) => (
        <div key={round} style={{ display: 'inline-block', width: '400px', verticalAlign: 'top', margin: '0 10px' }}>
          <h2 className='text-center'>Round {round}</h2>
          {rounds[round].map((match) => (
            <MatchComponent key={match._id} match={match} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TournamentBracket;
