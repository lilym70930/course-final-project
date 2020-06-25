import React, { Component } from 'react';
import axios from 'axios';
import LoadToServer from './LoadToServer';
class ShowFromServer extends Component {
  state = { img: '', newFileName: '' };

  getImageFromServer = () => {
    axios.get(`/images/${this.state.newFileName}`, { responseType: 'blob' })
      .then(res => {
        if (res.status === 200) {
          const reader = new FileReader();
          reader.readAsDataURL(res.data);
          const _this = this;
          reader.onload = function () {
            const imagDataURL = reader.result;
            _this.setState({ img: imagDataURL })
          }
        }
        else {
          console.log(`error statuse cose: ${res.statuse}`);
        }

      })
      .catch(err => console.log(err));

  }

  render() {
    return (
      <div>
        <LoadToServer />
     file name from upload directory <input onChange={evt => this.setState({ newFileName: evt.target.value })} />
        <button onClick={this.getImageFromServer}>Show</button>
        <img src={this.state.img} alt={'img'} />
      </div>
    )

  }


}
export default ShowFromServer;