//import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../modules/auth';
import TournamentBracket from '../../../../../_metronic/partials/widgets/Bracket/TournamentBracket';



const SingleMatchBracket = () => {

  const [matches, setMatches] = useState([]);

  
   //get the division id from the route
   const { id } = useParams();
   console.log('division id of this bracket ',id);
   const { auth } = useAuth();


 
   
   

   


  

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
          setMatches(data.matches);
        } catch (error) {
          console.error('Error fetching divisions:', error);
        }
      };

    fetchDivisions();
  }, [id, auth?.api_token]);

 

 

  
  
  
 

  


  return (

    <div  >
      <h1>Tournament Bracket</h1>
      
      <TournamentBracket matches={matches} />
      
    </div>
  );
};
export default SingleMatchBracket;