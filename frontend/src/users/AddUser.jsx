import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    const [errors, setErrors] = useState({});

    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        validateField(e.target.name, e.target.value);
    };

    const validateField = (fieldName, value) => {
        let fieldErrors = { ...errors };

        switch (fieldName) {
            case "name":
                fieldErrors.name = value.trim() ? "" : "Name is required";
                break;
            case "username":
                fieldErrors.username = value.trim() ? "" : "Username is required";
                break;
            case "email":
                if (!value.trim()) {
                    fieldErrors.email = "Email is required";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    fieldErrors.email = "Email is invalid";
                } else {
                    fieldErrors.email = "";
                }
                break;
            default:
                break;
        }

        setErrors(fieldErrors);
    };

    const validateForm = () => {
        let formErrors = {};
        if (!name.trim()) formErrors.name = "Name is required";
        if (!username.trim()) formErrors.username = "Username is required";
        if (!email.trim()) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = "Email is invalid";
        }
        return formErrors;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error("Please correct the errors in the form.");
            return;
        }

        try {
            await axios.post("http://localhost:8081/user", user);
            toast.success('User Added Successfully!');
            setTimeout(() => {
                navigate('/');
            }, 2500);
        } catch (error) {
            toast.error("Failed to create user. Please try again.");
        }
    };

    return (
        <div className='container mt-lg-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-primary fs-1 text-center fw-bold'>Add User</h2>
                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="Name" className='form-label fw-bold'>Name :</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder='Enter your name'
                                name='name'
                                value={name}
                                onChange={onInputChange}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="Username" className='form-label fw-bold'>Username :</label>
                            <input
                                type="text"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                placeholder='Enter your username'
                                name='username'
                                value={username}
                                onChange={onInputChange}
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="Email" className='form-label fw-bold'>Email :</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder='Enter your email'
                                name='email'
                                value={email}
                                onChange={onInputChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link to='/' type='button' className='btn btn-outline-danger mx-2' onClick={() => navigate('/')}>Cancel</Link>
                        <Toaster position="top-center" reverseOrder={false} />
                    </form>
                </div>
            </div>
        </div>
    );
}
