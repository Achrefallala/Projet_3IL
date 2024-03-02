import {Route, Routes, Outlet} from 'react-router-dom'
import TournamentPage from './components/TournamentPage';
import DisplayDivisions from '../set-up-tournament/components/tournaments-divisions/displayDivisions';
import UsersPage from './components/UsersPage';

//import SetUpTournament from './components/my-tournaments/SetUpTournament';



const AdminPage=()=>(
    
    <Routes>
        <Route element={<Outlet />}>

                    <Route
                        path='alltournaments'
                        element={
                        <>                   
                        <TournamentPage /> 
                        </> }
                        />

                    
<Route
                        path='Users'
                        element={
                            <>
                                <UsersPage />
                            </>
                        }
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

export default AdminPage;