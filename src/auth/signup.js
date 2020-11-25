import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';

const Signup = (props) => {
    const { register, handleSubmit, getValues, errors } = useForm();
    
    const isLoggedIn = localStorage.getItem('auth')
    if(isLoggedIn){
        props.history.push('/home')
    }

	const SignupFormSubmit = (data) => {
        axios.post('http://localhost:5555/api/create-admin',data).then(res => {
            // handle success
            console.log('Successfully Created.');
            toast.success("Successfully Created.");
            props.history.push("/login")
        })
        .catch(err => {
            // handle error
            console.log(err.response.data);
            toast.error(err.response.data);
        })
    };
    

	return (
        <div className="app-form">
            <div className="form-title">Create a new account</div>
            <form name="CreateAccount" className="form" onSubmit={handleSubmit(SignupFormSubmit)} autoComplete="off" noValidate>
                <div className="form-group">
                    <label>First Name</label>
                    <input name="FirstName" className="form-control" placeholder="Enter your first name" ref={register({ 
                        required: {
                            value: true,
                            message: "Enter your first name."
                        },
                        minLength: {
                            value: 3,
                            message: "Minimum 3 letters."
                        },
                        maxLength: {
                            value: 30,
                            message: "Maximum 5 letters."
                        }
                        })} />
                    {errors.FirstName && <span className="form-error">{ errors.FirstName.message }</span>}
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="LastName" className="form-control" placeholder="Enter your last name" />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="Email" className="form-control" placeholder="Enter email" ref={register({ 
                        required: {
                            value: true,
                            message: "Enter your email."
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Invalid email."
                        }
                        })} />
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                    {errors.Email && <span className="form-error">{ errors.Email.message }</span>}
                </div>
                <div className="form-group">
                    <label>Mobile</label>
                    <input type="text" name="Mobile" className="form-control" placeholder="Enter your mobile number" ref={register({ 
                        required: {
                            value: true,
                            message: "Enter your mobile number."
                        },
                        pattern: {
                            value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                            message: "Invalid mobile number"
                        }
                        })} />
                    {errors.Mobile && <span className="form-error">{ errors.Mobile.message }</span>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="Password" className="form-control" placeholder="Password" ref={register({ 
                        required: {
                            value: true,
                            message: "Enter your password."
                        },
                        pattern: {
                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{5,}$/,
                            message: "At least 5 characters. At least 1 numeric character. At least 1 lowercase letter. At least 1 uppercase letter. At least 1 special character"
                        }
                        })} />
                    {errors.Password && <span className="form-error">{ errors.Password.message }</span>}
                </div>
                <div className="form-group">
                    <label>Confirm your password</label>
                    <input type="password" name="ConfirmPassword" className="form-control" placeholder="Confirm your password" ref={register({ 
                        validate: {
                            matchesPreviousPassword: value => {
                                const { Password } = getValues();
                                return Password === value || "Passwords should match!";
                            }
                        }
                        })} />
                    {errors.ConfirmPassword && <span className="form-error">{ errors.ConfirmPassword.message }</span>}
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input type="checkbox" name="Accept" className="form-check-input" id="accept" ref={register({ 
                            required: true
                            })} />
                        <label className="form-check-label" htmlFor="accept">I accept the <a className="app-link" href="./terms">terms</a> and <a className="app-link" href="./conditions">conditions</a>.</label>
                    </div>
                    {errors.Accept && <span className="form-error">Please accept the terms and conditions.</span>}
                </div>
                <button type="submit" className="btn btn-success">Signup</button>
                <button type="button" className="btn app-link" onClick={() => {
                    props.history.push('/login')
                }}>Login</button>
            </form>
        </div>
	);
}

export default Signup;
