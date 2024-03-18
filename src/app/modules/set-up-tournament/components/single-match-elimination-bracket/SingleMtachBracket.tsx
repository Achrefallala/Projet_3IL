import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../modules/auth';
/*
const matches = [
  {
    "id": 260001,
    "name": "Quarter-Final 1",
    "nextMatchId": 260003,
    "tournamentRoundText": "1",
    "startTime": "2021-05-27",
    "state": "DONE",
    "participants": [
      {
        "id": "participant1",
        "resultText": "WON",
        "isWinner": true,
        "status": "PLAYED",
        "name": "Team A"
      },
      {
        "id": "participant2",
        "resultText": "LOST",
        "isWinner": false,
        "status": "PLAYED",
        "name": "Team B"
      }
    ]
  },
  {
    "id": 260002,
    "name": "Quarter-Final 2",
    "nextMatchId": 260003,
    "tournamentRoundText": "1",
    "startTime": "2021-05-27",
    "state": "DONE",
    "participants": [
      {
        "id": "participant3",
        "resultText": "WON",
        "isWinner": true,
        "status": "PLAYED",
        "name": "Team C"
      },
      {
        "id": "participant4",
        "resultText": "LOST",
        "isWinner": false,
        "status": "PLAYED",
        "name": "Team D"
      }
    ]
  },
  {
    "id": 260003,
    "name": "Semi-Final 1",
    //"nextMatchId": ,
    "tournamentRoundText": "2",
    "startTime": "2021-05-28",
    "state": "DONE",
    "participants": [
      {
        "id": "participant1",
        "resultText": "LOST",
        "isWinner": false,
        "status": "PLAYED",
        "name": "Team A"
      },
      {
        "id": "participant3",
        "resultText": "WON",
        "isWinner": true,
        "status": "PLAYED",
        "name": "Team C"
      }
    ]
  },
  
];*/


const SingleMatchBracket = () => {

  const [matches, setMatches] = useState([]);

  
   //get the division id from the route
   const { id } = useParams();
   console.log('division id of this bracket ',id);
   const { auth } = useAuth();


 
   
   

   //function that transform the matches to the format that the bracket component needs
   const transformMatches = (matches) => {
    return matches.map((match , index) => {
      const participants = [
        {
          id: match.team1?._id,
          resultText: "Null", // You might need a logic to determine the result text
          isWinner: false, // You might need a logic to determine the winner
          status: null, // Assuming all matches are not played yet; adjust as necessary
          name: match.team1?.name,
        },
        {
          id: match.team2?._id,
          resultText: "Null", // You might need a logic to determine the result text
          isWinner: false, // You might need a logic to determine the winner
          status: null, // Assuming all matches are not played yet; adjust as necessary
          name: match.team2?.name,
        }
      ];
      const date = new Date(match.time);
      const formattedDate = date.toLocaleString();
  
      return {
        id: match._id,
        name: `Match ${index + 1}`, // Adjust name as necessary
        nextMatchId: match.nextMatchId || null, // Adjust based on your data structure
        tournamentRoundText: "1", // Adjust based on your data structure
        startTime: formattedDate,
        state: "DONE", // Assuming all matches are done; adjust as necessary
        participants,
      };
    });
  };


   //get the matches from the database
  useEffect(() => {
    const fetchDivisions = async () => {
        try {
          // change it with axios not fetch 
          const response = await fetch(`${process.env.REACT_APP_API_URL}/match/getMatches/${id}`, {
            headers: {
              Authorization: `Bearer ${auth?.api_token}`
            }
          });
          const data = await response.json();
          console.log('bracket matches', data.matches);
            // Assume `originalMatches` is the data you fetched
            const transformedMatches = transformMatches(data.matches);
            console.log('matches', transformedMatches );
          setMatches(transformedMatches);
        } catch (error) {
          console.error('Error fetching divisions:', error);
        }
      };

    fetchDivisions();
  }, [id, auth?.api_token]);

 

 

  
  
  
 

  


  return (
    <div>
    <h1>Single Match Bracket</h1>
    {matches.length > 0 ? (
      <SingleEliminationBracket
        matches={matches}
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => (
          <SVGViewer width={800} height={800} {...props}>
            {children}
          </SVGViewer>
        )}
      />
    ) : (
      <div>Loading matches...</div>
    )}
  </div>
  );
};
export default SingleMatchBracket;