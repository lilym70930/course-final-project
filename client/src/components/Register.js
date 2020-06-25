import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../css fils/Register.css';

class Register extends Component {
  state = {
    email: '', password: '', fullName: '',
    age: '', city: '', phoneNumber: '',
    prefetionalRol: '',
    redirectToHome: false, company: '',
    intrest: '',
    isError: false
  };
  register = () => {
    this.setState({ isError: false });
    axios.post("/users/register", {
      email: this.state.email,
      password: this.state.password,
      fullName: this.state.fullName,
      age: this.state.age,
      city: this.state.city,
      phoneNumber: this.state.phoneNumber,
      prefetionalRol: this.state.prefetionalRol,
      company: this.state.company,
      intrest: this.state.intrest,
    }).then(res => {

      if (res.status === 201) {
        this.setState({ redirectToHome: true });
        this.props.setUser({
          email: this.state.email,
          password: this.state.password,
          fullName: this.state.fullName,
          age: this.state.age,
          city: this.state.city,
          phoneNumber: this.state.phoneNumber,
          prefetionalRol: this.state.prefetionalRol,
          company: this.state.company,
          intrest: this.state.intrest,
        })
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

    const disabled = !this.state.email || !this.state.password || !this.state.fullName
      || !this.state.age || !this.state.city || !this.state.phoneNumber || !this.state.prefetionalRol
      || !this.state.company || !this.state.intrest;

    if (this.state.redirectToHome) {
      return <Redirect to="/Logout" />
    }
    return (
      <div className="register_container">
        <div className="register" >
          <h1>Welcome to Let's meet!</h1>

          <input placeholder="Full Name"
            onChange={evt => this.setState({ fullName: evt.target.value })}
            type="text" />
          <br />
          <input placeholder="Age"
            onChange={evt => this.setState({ age: evt.target.value })}
            type="number" />
          <br />
          <input placeholder="City"
            onChange={evt => this.setState({ city: evt.target.value })}
            type="text" />
          <br />
          <input placeholder="Phone Number"
            onChange={evt => this.setState({ phoneNumber: evt.target.value })}
            type="number" />
          <br />
          <input placeholder=" Email Adress"
            onChange={evt => this.setState({ email: evt.target.value })}
            type="email" />
          <br />
          <input placeholder="Prefetional Rol"
            onChange={evt => this.setState({ prefetionalRol: evt.target.value })}
            type="text" />
          <br />
          <input placeholder="Company"
            onChange={evt => this.setState({ company: evt.target.value })}
            type="text" />
          <br />
          <input placeholder="Intrest"
            onChange={evt => this.setState({ intrest: evt.target.value })}
            type="text" />
          <br />
          <input placeholder="Password"
            onChange={evt => this.setState({ password: evt.target.value })}
            type="password" />
          <br />
          {this.state.isError ? <p style={{ color: 'red' }}>Register error</p> : ""}
          <button disabled={disabled} onClick={this.register}>Register</button>
        </div>
      </div>
    )
  }
}

export default Register;