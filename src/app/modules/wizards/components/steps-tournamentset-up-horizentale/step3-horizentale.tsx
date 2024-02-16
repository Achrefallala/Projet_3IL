import React, { useState } from 'react';
import { useFormikContext, Field } from 'formik';
import { ISetUpTournament } from '../SetUpTournamentWizardHelper';
import { KTIcon } from '../../../../../_metronic/helpers';

const Step3Horizentale = () => {
    const { values, setFieldValue } = useFormikContext<ISetUpTournament>();
    const [newTeam, setNewTeam] = useState({ name: '', logo: '' , location: ''});

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setNewTeam({ ...newTeam, logo: reader.result });
            }
        };
        reader.readAsDataURL(file);
    };

    const handleAddTeam = () => {
        if (newTeam.name && newTeam.logo) {
            setFieldValue('teams', [...(values.teams || []), newTeam]);
            setNewTeam({ name: '', logo: '' , location: ''});
        }
    };

    return (
        <div className="container">
        <div className="row ">
            <div className="col-md-6">
                <h2>Add New Team</h2>
                <Field name="name" className="form-control" placeholder="Team Name" value={newTeam.name} onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} />
                <Field name="location" className="form-control" placeholder="Team Location" value={newTeam.location} onChange={(e) => setNewTeam({ ...newTeam, location: e.target.value })} />
                <input type="file" name="logo" className="form-control" onChange={handleFileChange} />
                <button type="button" className="btn btn-primary mt-2" onClick={handleAddTeam}>Add Team</button>
            </div>
            <div className="col-md-6 ">
                <h2>Teams Added</h2>
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
                                        <img src={team.logo} alt='' />
                                    </div>
                                </td>
                                <td>
                                    <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                        {team.name}
                                    </a>
                                    <span className='text-muted fw-semibold d-block fs-7'>{team.location}</span>
                                </td>
                                <td></td>
                                <td className='text-end'>
                                <a
                                    href=''
                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                                >
                                    <KTIcon iconName='trash' className='fs-3' />
                                </a>
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