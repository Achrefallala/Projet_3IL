import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { KTIcon } from '../../../helpers';
import { Link } from 'react-router-dom';

// Supposons que Props soit déjà défini pour inclure Users comme un tableau d'objets utilisateur
type User = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status:string;
};

type Props = {
  Users: User[];
};

const TablesWidget11AdminUsers: React.FC<Props> = ({ Users }) => {
  const [newUsers, setNewUsers] = useState<User[]>([]);

  useEffect(() => {
    setNewUsers([...Users]);
  }, [Users]);

  const banUser = async (userId: string) => {
    try {
      await axios.put(`http://localhost:3001/user/ban/${userId}`);
      
      setNewUsers(newUsers.map(user => user._id === userId ? { ...user, status: 'banned' } : user));
      alert('User banned successfully');
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const unbanUser = async (userId: string) => {
    try {
      await axios.put(`http://localhost:3001/user/activate/${userId}`);
    
      setNewUsers(newUsers.map(user => user._id === userId ? { ...user, status: 'active' } : user));
      alert('User unbanned successfully');
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  return (
    <div className='me-10'>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-325px rounded-start'>User</th>
                <th className='min-w-125px'>Email</th>
                <th className='min-w-125px'>Role</th>
                <th className='min-w-125px'> Status </th>
                <th className='min-w-200px text-end rounded-end'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newUsers.map((User, index) => (
                <tr key={index}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-50px me-5'>
                        {/* Placeholder for user image */}
                        <img src='path_to_image' className='' alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                          {User.first_name} {User.last_name}
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {User.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td><strong>{User.email}</strong></td>
                  <td>
                    <span className='badge badge-light-primary fs-7 fw-semibold'>
                      {User.role}
                    </span>
                  </td>
                  <td>
                    <span className='badge badge-light-primary fs-7 fw-semibold'>
                      {User.status}
                    </span>
                  </td>
                  <td className='text-end'>
                    <button onClick={() => banUser(User._id)} className='btn btn-warning btn-sm me-2'>Ban</button>
                    <button onClick={() => unbanUser(User._id)} className='btn btn-success btn-sm'>Unban</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget11AdminUsers };
