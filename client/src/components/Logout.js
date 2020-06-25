import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = props => {

    sessionStorage.removeItem("user");
    props.setUser(null);
    return (
        <Redirect to='/' />
    )
}

export default Logout;