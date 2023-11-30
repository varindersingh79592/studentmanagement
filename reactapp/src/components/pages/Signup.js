import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../style/pages.css';

const Signup = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userNameEmailExists, setUserNameEmailExists] = useState(false);
    const [postError, setPostError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (event) => {
        if (event.target.id === 'userName') {
            setUserName(event.target.value)
        }
        if (event.target.id === 'email') {
            setEmail(event.target.value)
        }
        if (event.target.id === 'password') {
            setPassword(event.target.value)
        }
    }
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSignIn = async (event) => {
        event.preventDefault();
        const signUpRequest = {
            username: userName,
            email: email,
            password: password,
            role: ['user']

        }
        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpRequest)
            })
            const result = await response.json();

            if (response.ok) {
                setUserNameEmailExists(false);
                setPostError(false);
                setSuccess(true);
            }
            if (!response.ok) {
                if (result.message === 'Error: Username is already taken!' || result.message === 'Error: Username is already taken!') {
                    setUserNameEmailExists(true);
                    setTimeout(() => {
                        setUserNameEmailExists(false);
                    }, 3000);
                }
                else {
                    setPostError(true);
                    setTimeout(() => {
                        setPostError(false);
                    }, 3000);
                }
            }


        }
        catch (error) {


        }
        setTimeout(() => {
            setEmail('');
            setPassword('');
            setUserName('');
            setShowPassword(false);
            setUserNameEmailExists(false);
            setPostError(false);
            setSuccess(false)
        }, 3000)

    }
    return (
        <form>
            <h1>Sign Up</h1>

            <div className="label-container">
                <label className='form_label' htmlFor='userName'>Enter UserName</label>
                <input type='text' id='userName' onChange={handleInputChange} value={userName}></input>
            </div>

            <div className="label-container">
                <label className='form_label' htmlFor='email'>Enter Email</label>
                <input type='email' id='email' onChange={handleInputChange} value={email}></input>
            </div>

            <div className="label-container input-container">
                <label className='form_label' htmlFor='password'>Enter Password</label>
                <input type={showPassword ? 'text' : 'password'} id='password' onChange={handleInputChange} value={password}></input>
                <span className="eye-icon" onClick={handleTogglePassword}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
            </div>
            {
                userNameEmailExists && (
                    <p className="error-message">Username or email already exists.</p>
                )
            }
            {
                postError && (
                    <p className="error-message">Error in Creating User</p>
                )
            }
            {
                success && (
                    <p className='success-message'>Successfully created </p>
                )
            }
            <button onClick={handleSignIn} className='signin-signup-button '>SIGN UP</button>
            <br /><br />
            <hr />
            <Link to="/signin">
                <button type="button" className='nav-button'> Back to Sign In</button>
            </Link>

        </form>
    )
}

export default Signup