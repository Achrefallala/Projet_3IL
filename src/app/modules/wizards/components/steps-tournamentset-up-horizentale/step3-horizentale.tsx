import React, { useState } from 'react';
import { useFormikContext, Field } from 'formik';
import { ISetUpTournament } from '../SetUpTournamentWizardHelper';
import { KTIcon } from '../../../../../_metronic/helpers';

const Step3Horizentale = () => {
    const { values, setFieldValue , errors} = useFormikContext<ISetUpTournament>();
    const [newTeam, setNewTeam] = useState({ name: '', logo: null , location: ''});

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewTeam({ ...newTeam, logo: file });
    };

    const handleAddTeam = () => {
        if (newTeam.name && newTeam.logo) {
            setFieldValue('teams', [...(values.teams || []), newTeam]);
            setNewTeam({ name: '', logo: null, location: ''});
        }
    };

    return (
        <div className="container">
        <div className="row ">
            <div className="col-md-6">
           
                <Field name="name" className="form-control" placeholder="Team Name" value={newTeam.name} onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} />
                <br />
                <Field name="location" className="form-control" placeholder="Team Location" value={newTeam.location} onChange={(e) => setNewTeam({ ...newTeam, location: e.target.value })} />
                <br />
                <input type="file" name="logo" className="form-control" onChange={handleFileChange} />
                <br />
                <button type="button" className="btn btn-warning mt-2" onClick={handleAddTeam}><KTIcon iconName='plus' className='fs-3' />Add Team</button>
            </div>
            <div className="col-md-6 ">
            <h2><i className="fas fa-users "></i> Teams Added</h2>
                {errors.teams && <div className="text-danger">{errors.teams}</div>}
                <table className='table align-middle gs-0 gy-3 ms-10'>
                    <thead>
                        <tr>
                            <th className='p-0 w-50px'></th>
                            <th className='p-0 min-w-150px'></th>
                            <th className='p-0 min-w-140px'></th>
                            <th className='p-0 min-w-120px'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.teams?.map((team, index) => (
                            <tr key={index}>
                                <td>
                                    <div className='symbol symbol-50px'>
                                        {team.logo && <img src={URL.createObjectURL(team.logo)} alt='' />}
                                    </div>
                                </td>
                                <td>
                                    <span  className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                        {team.name}
                                    </span>
                                    <span className='text-muted fw-semibold d-block fs-7'>{team.location}</span>
                                </td>
                                <td></td>
                                <td className='text-end'>
                                <button type="button" className="btn btn-light btn-active-light-primary btn-sm" onClick={() => setFieldValue('teams', values.teams?.filter((_, i) => i !== index))}>
                                    <KTIcon iconName='trash' className='fs-3' />
                               </button>
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

export { Step3Horizentale };