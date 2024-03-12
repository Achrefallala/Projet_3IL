import { Navigate, Route, Routes } from 'react-router-dom'
import EditPlayer from './components/EditPLayer'
import { useDispatch } from 'react-redux'
import { fetchPlayers } from '../../../redux/slices/playersSlice';
import { lazy } from 'react';

const Team = lazy(() => import('./components/Team'));


function TeamPage() {

  const dispatch = useDispatch();
  return (

    <Routes>
      <Route path='/'>
        <Route index element={<Team />} />
        <Route path='editPlayer' element={<EditPlayer />} />
        <Route path=':teamId/*' element={<Navigate to='/' />} />
      </Route>
    </Routes>


  )

}

export default TeamPage
