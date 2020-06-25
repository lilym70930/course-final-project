import React, { Component } from "react";
import axios from "axios";
import '../css fils/meetups.css';
import ShareTwitter from './Share_twitter';
import ShareFacebook from './Share_facebook';

class ShowAllMeetups extends Component {
  state = { user: [] };
  componentDidMount = () => {
    axios
      .get('/users/ShowAllMeetups')
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          this.setState({ user: res.data })
        }
        else {
          console.log(`error status code : ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.user)

    const users = this.state.user.map((user, i) => {
      return <div className='meetups' key={i}>
        <p><b>Full Name:</b>{user.fullName}<br />
          <b> Email:</b>{user.email}<br />
          <b> Meetup subject:</b>{user.meetupSubject}<br />
          <b> Where:</b>{user.where}<br />
          <b> When:</b>{user.when}<br />
          <b>Description:</b>{user.description}<br />
          <b>How moch?</b>{user.howMuch}</p>

        <p id="p_share">Whant to share this Meetup?</p><ShareFacebook /><ShareTwitter />
      </div>
    })

    return (
      <div className="show_meetups_container">
                <h1>LET'S SEE MEETUPS</h1>

      <div className='all_meetups'>
        <div className="meetups_info_container">
        {users}
        </div>
      </div>
      </div>
    );
  }
}

export default ShowAllMeetups;