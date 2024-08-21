import React from 'react'
import { Link } from 'react-router-dom'

export default function Navibar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand text-white fs-3" href="#">CRUD | Application</a>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}

                    <Link to='/adduser' className='btn btn-outline-light px-3 py-2'>Add User</Link>
                </div>
            </nav>
        </div>
    )
}
