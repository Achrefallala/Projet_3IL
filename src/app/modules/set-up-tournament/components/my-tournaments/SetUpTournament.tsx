import {useState , useEffect}from 'react'
import { useAuth } from '../../../../modules/auth';
import axios from 'axios';
import {TablesWidget11} from '../../../../../_metronic/partials/widgets/tables/TablesWidget11';

function SetUpTournament(){
    const [tournaments, setTournaments] = useState([]);
    const { auth } = useAuth();
    useEffect(() => {
      const fetchTournaments = async () => {
        try {
          
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/tournament/user-tournaments`, {
            headers: {
              Authorization: `Bearer ${auth?.api_token}`
            }
          });
          setTournaments(response.data);
          console.log('response.data', response.data);
        } catch (error) {
          console.error('Error fetching tournaments:', error);
        }
      };
  
      fetchTournaments();
    },[ ]); // tableau de dependances condition d update de useEffect
    return(
        <div>
            <TablesWidget11 tournaments={tournaments} />
         

        </div>
    )
}

export default SetUpTournament;