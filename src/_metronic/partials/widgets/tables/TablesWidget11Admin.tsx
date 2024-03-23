/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState,useEffect} from 'react'
import { KTIcon } from '../../../helpers'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { CreateAppModal } from '../../modals/create-app-stepper/CreateAppModal';


type Props = {

  tournaments: any[];






}









const TablesWidget11Admin: React.FC<Props> = ({ tournaments }) => {


  useEffect(() => {
  
    setNewTournaments([].concat(...Object.values(tournaments) as any));
   
  },[tournaments]);

  const [newTournaments,setNewTournaments]= useState([].concat(...Object.values(tournaments)));



  const handleDelete = async (identifiant: string) => {

    console.log("new tournaments here",newTournaments);
  
    setNewTournaments(prevTournaments => (prevTournaments as any).filter(t => t._id != identifiant))
  
    try {

      const response = await axios.delete(`http://localhost:3001/tournament/tournament/${identifiant}`);
       if (!response.status) {
         throw new Error('Failed to delete the tournoi');
       }
     
    } catch (error) {
      console.error('Failed to delete tournoi:', error);
    }
  };

  
  const combinedTournaments = [].concat(...Object.values(tournaments));

  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)


  const [selectedTournamentId, setSelectedTournamentId] = useState(null);

  const handleOpenModal = (id) => {
   
    if (!selectedTournamentId) {
      setSelectedTournamentId(id);
    }
    setShowCreateAppModal(true);
  };
  

  const resetSelectedTournamentId = () => {
    setSelectedTournamentId(null);
  };
 

  return (
    <div className='me-10'>
      {/* begin::Header */}

      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-325px rounded-start'>Tournament</th>
                <th className='min-w-125px'>Sexe</th>
                <th className='min-w-125px'>Divisions</th>
                <th className='min-w-125px'>Dates</th>
                <th className='min-w-150px'>Status</th>
                <th className='min-w-200px text-end rounded-end'>Actions</th>


              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {(newTournaments as any[]).map((tournament, index) => (
              
                <tr key={index}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-50px me-5'>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${tournament.tournamentLogo.replace(/\\/g, '/')}`}
                          className=''
                          alt=''
                        />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a
                          href='#'
                          className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                        >
                          {tournament.tournamentName}
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {tournament.tournamentLevel}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {tournament.tournamentSexe === 'male' ? (
                      <i className='fas fa-male fs-3x me-5'></i>
                    ) : tournament.tournamentSexe === 'female' ? (
                      <i className='fas fa-female fs-3x me-5'></i>
                    ) : null}
                  </td>

                  <td><strong>{tournament.divisions} </strong></td>
                  <td>
                    <strong>Start:</strong> {new Date(tournament.tournamentStartDate).toLocaleDateString()}<br />
                    <strong>End:</strong> {new Date(tournament.tournamentEndDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className='badge badge-light-primary fs-7 fw-semibold'>
                      {tournament.status}
                    </span>
                  </td>
                  <td className='text-end'>
                    <Link
                      to={`/setuptournament/displaydivisions/${tournament._id}`}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='switch' className='fs-3' />
                    </Link>
                    <a  onClick={() => handleOpenModal(tournament._id)}
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                     
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <div onClick={()=>handleDelete(tournament._id)}>
                        <KTIcon iconName='trash' className='fs-3' />
                      </div>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export { TablesWidget11Admin}