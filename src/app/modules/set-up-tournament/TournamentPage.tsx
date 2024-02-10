import {Route, Routes, Outlet} from 'react-router-dom'
//import SetUpTournament from './components/my-tournaments/SetUpTournament';
import SetUpTournament from './components/my-tournaments/SetUpTournament';
import DisplayDivisions from './components/tournaments-divisions/displayDivisions';


const TournamentPage=()=>(
    
    <Routes>
        <Route element={<Outlet />}>

                    <Route
                        path='mytournaments'
                        element={
                        <>                   
                        <SetUpTournament /> 
                        </> }
                        />

                    

                    <Route
                        path='displaydivisions/:id'
                        element={
                            <>
                                <DisplayDivisions />
                            </>
                        }
                    />
                    
        </Route>
    </Routes>

        )

export default TournamentPage;