import React from 'react';
import MatchComponent from './MatchComponent';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Match } from './MatchModel';

interface TournamentBracketProps {
  matches: Match[];
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({ matches }) => {
    const rounds = matches.reduce((acc: Record<string, Match[]>, match) => {
        const round = match.round.toString();
        if (!acc[round]) {
            acc[round] = [];
        }
        acc[round].push(match);
        return acc;
    }, {});

    return (
       
                    <div style={{ width: 'auto', height: '600px', overflow: 'auto', whiteSpace: 'nowrap' }}>
                        <br /> <br />
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
