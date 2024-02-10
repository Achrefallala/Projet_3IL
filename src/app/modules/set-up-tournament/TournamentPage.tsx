import {Route, Routes, Outlet} from 'react-router-dom'
//import SetUpTournament from './components/my-tournaments/SetUpTournament';
import SetUpTournament from './components/my-tournaments/SetUpTournament';
import DisplayDivisions from './components/tournaments-divisions/displayDivisions';
import DivisionConfig from './components/division-config/DivisionConfig';


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

                    <Route
                        path='divisionconfig/:id'
                        element={
                            <>
                                <DivisionConfig />
                            </>
                        }
                    />
                    
        </Route>
    </Routes>

        )

export default TournamentPage;