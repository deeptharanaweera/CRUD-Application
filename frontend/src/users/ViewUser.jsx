import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewUser() {

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: ""
  })

  const {id} = useParams();
  
  useEffect(() =>{  
    loadUser();
  }, []);

  const loadUser = async () =>{
    const result = await axios.get(`http://localhost:8081/user/${id}`);
    setUser(result.data);
  }
  return (
    <div className='container mt-lg-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-primary fs-1 text-center fw-bold'>User Details</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Details of user id : <h7 className='fw-bold'>{id}</h7>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name : </b>
                                    {user.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>User Name : </b>
                                    {user.username}
                                </li>
                                <li className='list-group-item'>
                                    <b>Email : </b>
                                    {user.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to='/' className='btn btn-primary my-2'>Back to home</Link>
                </div>
            </div>
        </div>
  )
}
