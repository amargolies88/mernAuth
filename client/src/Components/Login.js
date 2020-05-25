import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import { AuthContext } from '../Context/AuthContext';

const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please sign in</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" name="username" onChange={onChange} className="form-control" placeholder="Enter Username" />
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="text" name="password" onChange={onChange} className="form-control" placeholder="Enter Password" />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Log in </button>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
    )
};

export default Login;