import React, { useState } from "react"
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router';
import '../style/pages.css';

const SignIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [badCredentials, setBadCredentials] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (event) => {
        if (event.target.id === 'userName')
            setUserName(event.target.value)
        if (event.target.id === 'password')
            setPassword(event.target.value)
    }
    const handleSignIn = async (event) => {
        event.preventDefault();
        const signInRequest = {
            password: password,
            username: userName

        }
        try {
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInRequest)
            });

            if (response.ok) {
                setBadCredentials(false);
                const token = await response.json();

                localStorage.setItem('token', token.accessToken
                );
                setSuccess(true);
            } else {
                const token = await response.json();
                if (token.message === 'Bad credentials') {
                    setBadCredentials(true);
                }
                setTimeout(() => {
                    setBadCredentials(false);
                }, 3000)
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    }

    const handleEyeButton = () => {
        setShowPassword(!showPassword)
    }
    return (
        <form>
            <h1>Sign In</h1>
            <div className="label-container">
                <label htmlFor="userName" className='form_label'>UserName</label>
                <input type="text" id="userName" value={userName} onChange={handleInputChange}></input>
            </div>
            <div className="label-container input-container">
                <label htmlFor="password" className='form_label'>Password</label>
                <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={handleInputChange}></input>
                <span className="eye-icon" onClick={handleEyeButton}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
            </div>
            {
                badCredentials && (
                    <p className="error-message"> Invalid Username Or Password</p>
                )
            }
            {
                success && (
                    <>
                        <p className="success-message">Successfully Logged In</p>
                        <Navigate to="/profile"></Navigate >
                    </>
                )
            }
            <button type='submit' className='signin-signup-button ' onClick={handleSignIn}>Sign In</button>
            <br /><br />
            <hr />
            <Link to="/signup">
                <button type="button" className="nav-button">Create New Account</button>
            </Link>
        </form>
    )
}
export default SignIn;