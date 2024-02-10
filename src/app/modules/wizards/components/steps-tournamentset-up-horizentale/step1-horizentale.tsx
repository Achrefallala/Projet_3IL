import { FC } from "react";
import {KTIcon} from '../../../../../_metronic/helpers'
import { Field  , ErrorMessage} from 'formik'

const Step1Horizentale:FC = () => {
    return (
        <div className='w-100'>
        <div className='pb-10 pb-lg-15'>
          <h2 className='fw-bolder d-flex align-items-center text-dark'>
            Choose Division Type
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Billing is issued based on your selected account type'
            ></i>
          </h2>
  
          <div className='text-gray-400 fw-bold fs-6'>
            If you need more info, please check out
            <a href='/dashboard' className='link-primary fw-bolder'>
              {' '}
              Help Page
            </a>
            .
          </div>
        </div>
  
        <div className='fv-row'>
          <div className='row'>
            <div className='col-lg-6'>
              <Field
                type='radio'
                className='btn-check'
                name='tournamentType'
                value='singlematch'
                id='kt_create_account_form_account_type_personal'
              />
              <label
                className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10'
                htmlFor='kt_create_account_form_account_type_personal'
              >
                <KTIcon iconName='address-book' className='fs-3x me-5' />
  
                <span className='d-block fw-bold text-start'>
                  <span className='text-dark fw-bolder d-block fs-4 mb-2'>Single Match Elimination</span>
                  <span className='text-gray-400 fw-bold fs-6'>
                    winner-takes-all showdowns, with each match deciding who
                     advances to the next round and who is eliminated
                  </span>
                </span>
              </label>
            </div>
  
            <div className='col-lg-6'>
              <Field
                type='radio'
                className='btn-check'
                name='tournamentType'
                value='championship'
                id='kt_create_account_form_account_type_corporate'
              />
              <label
                className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center'
                htmlFor='kt_create_account_form_account_type_corporate'
              >
                <KTIcon iconName='cross' className='fs-3x me-5' />
  
                <span className='d-block fw-bold text-start'>
                  <span className='text-dark fw-bolder d-block fs-4 mb-2'>Championship </span>
                  <span className='text-gray-400 fw-bold fs-6'>
                  The tournament winner is determined by the team that accumulates the highest
                   number of points throughout the duration of the competition <br /> <br />
                  </span>
                </span>
              </label>
            </div>
  
            <div className='text-danger mt-2'>
              <ErrorMessage name='tournamentType' />
            </div>
          </div>
        </div>
      </div>
    )
}

export {Step1Horizentale};