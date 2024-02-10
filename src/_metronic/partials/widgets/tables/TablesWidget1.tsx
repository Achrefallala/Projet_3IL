/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  Divisions: any[]
}

const TablesWidget1: React.FC<Props> = ({Divisions}) => {
  return (
    <div className='card'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>List of Divisions</span>
          <span className='text-muted fw-semibold fs-7'>{Divisions.length} divisions on this tournament</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTIcon iconName='category' className='fs-2' />
          </button>
          {/* begin::Menu 1 */}
          <Dropdown1 />
          {/* end::Menu 1 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-5'>
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className='p-0 w-50px'></th>
                <th className='p-0 min-w-200px'></th>
                <th className='p-0 min-w-100px'></th>
                <th className='p-0 min-w-40px'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {Divisions.map((division, index) => (
                <tr key={index}>
                  <th>
                    <div className='symbol symbol-50px me-2'>
                      <span className='symbol-label'>
                        <img
                          src={toAbsoluteUrl('/media/custom icon/tournament.png')} // replace this with the division logo
                      
                          className='h-50 align-self-center'
                          alt=''
                        />
                      </span>
                    </div>
                  </th>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                     Division : {division.name}
                    </a>
                    <span className='text-muted fw-semibold d-block fs-7'>{division.status}</span>
                  </td>
                  <td>
                    <div className='d-flex flex-column w-100 me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-semibold'>20%</span>
                      </div>
                      <div className='progress h-6px w-100'>
                        <div
                          className='progress-bar bg-primary'
                          role='progressbar'
                          style={{width: '20%'}} // customize this width if status pending 10 % is status is in progress (add teams players and games) 30% and
                          // if status is completed 100% (add teams players and games and schedule games and add scores and stats and awards  and sponsors
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className='text-end'>
                    <a href='#' className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'>
                      <KTIcon iconName='arrow-right' className='fs-2' />
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
    </div>
  )
}

export {TablesWidget1}
