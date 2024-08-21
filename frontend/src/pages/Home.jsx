import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const [users, setUsers] = useState([]); // Correctly use useState for state management
    const { id } = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8081/users");
        console.log(result.data);
        setUsers(result.data); // Update state with fetched users
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8081/user/${id}`);
        loadUsers();
        toast.success("User Deleted Successfully");
    }

    return (
        <div className='container '>
            <div className='py-4 '>
                <div className='align-items-center justify-content-center'>
                    <h1 className='text-primary fs-1 text-center fw-bold'>User's Details</h1>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-bordered border shadow">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col" className="text-center">ID</th>
                                <th scope="col" className="text-center d-none d-sm-table-cell">Name</th>
                                <th scope="col" className="text-center d-sm-none">Details</th>
                                <th scope="col" className="text-center d-none d-sm-table-cell">Username</th>
                                <th scope="col" className="text-center d-none d-sm-table-cell">Email</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <th scope="row" className="text-center">{index + 1}</th>
                                        <td className="text-center">
                                            <strong className='d-sm-none'>Name:</strong>{user.name}
                                            <br className="d-sm-none" />
                                            <span className="d-sm-none">
                                                <strong>Username:</strong>{user.username}<br />
                                                {user.email}
                                            </span>
                                        </td>
                                        <td className="text-center d-none d-sm-table-cell">{user.username}</td>
                                        <td className="text-center d-none d-sm-table-cell">{user.email}</td>
                                        <td className="text-center p-2">
                                            <Link to={`/viewuser/${user.id}`} className='btn btn-primary mx-2 mb-1'>View</Link>
                                            <Link to={`/edituser/${user.id}`} className='btn btn-outline-primary mx-2 mb-1'>Edit</Link>
                                            <button className='btn btn-danger mx-2' onClick={() => deleteUser(user.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>


                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    )
}
