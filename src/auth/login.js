import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';

const Login = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const isLoggedIn = localStorage.getItem('auth')
    if(isLoggedIn){
        props.history.push('/home')
    }

	const LoginFormSubmit = (data) => {
        axios.post('http://localhost:5555/api/login-admin',data).then(res => {
            // handle success
            console.log("Logged in successfully.")
            toast.success("Logged in successfully.");
            localStorage.setItem('auth',res.data)
            props.history.push("/home")
        })
        .catch(err => {
            // handle error
            console.log(err.response.data);
            toast.error(err.response.data);
        })
    };
    

	return (
        <div className="app-form">
            <div className="form-title">Login</div>
            <form name="LoginAccount" className="form" onSubmit={handleSubmit(LoginFormSubmit)} autoComplete="off" noValidate>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="Email" className="form-control" placeholder="Enter email" ref={register({ 
                        required: {
                            value: true,
                            message: "Enter your email."
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Invalid email format."
                        }
                        })} />
                    {errors.Email && <span className="form-error">{ errors.Email.message }</span>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="Password" className="form-control" placeholder="Password" ref={register({ 
                        required: {
                            value: true,
                            message: "Enter your valid password."
                        },
                        pattern: {
                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{5,}$/,
                            message: "At least 5 characters. At least 1 numeric character. At least 1 lowercase letter. At least 1 uppercase letter. At least 1 special character"
                        }
                        })} />
                    {errors.Password && <span className="form-error">{ errors.Password.message }</span>}
                </div>
                <button type="submit" className="btn btn-success">Login</button>
                <button type="button" className="btn app-link" onClick={() => {
                    props.history.push('/signup')
                }}>Signup</button>
            </form>
        </div>
	);
}

export default Login;
