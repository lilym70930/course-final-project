import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../css fils/Login.css';


class Login extends Component {
    state = {
        email: '', password: '',
        redirectToHome: false,
        isError: false
    };
    login = () => {
        this.setState({ isError: false });
        axios.post("/users/login", {
            email: this.state.email,
            password: this.state.password,
        }).then(res => {
            if (res.status === 200) {
                this.setState({ redirectToHome: true });
                this.props.setUser(res.data);
                sessionStorage.setItem("user", JSON.stringify(res.data));
                console.log(res.data);
            }
            else {
                this.setState({ isError: true })
                console.log(`error code : ${res.status}`);
            }
        }).catch(err => {
            this.setState({ isError: true })
            console.log(err);
        })
    }
    render() {

        const disabled = !this.state.email || !this.state.password;

        if (this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (

            <div>
                <div className="main_login_container">
                    <div className="Login" >
                        <h1>Login</h1>
                        <input placeholder="Email"
                            onChange={evt => this.setState({ email: evt.target.value })}
                            type="email" />
                        <br />
                        <input placeholder="Password"
                            onChange={evt => this.setState({ password: evt.target.value })}
                            type="password" />
                        <br />
                        <br />
                        {this.state.isError ? <p style={{ color: 'red' }}>Login error</p> : ""}
                        <button disabled={disabled} onClick={this.login}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;