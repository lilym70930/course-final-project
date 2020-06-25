import React, { Component } from 'react';
import home_page_video from '../img_video/home_page_video.mp4';
import '../css fils/Home.css'


class Home extends Component {

    render() {
        return (
            <div className="Home">

                <div className="top_video_container">
                    <video autoPlay={true} muted loop id="home_video_id" >
                        <source src={home_page_video} />
                    </video>
                    <div className="headline">
                        <h1 id="hedline_on_video">Let's Meet</h1>

                    </div>
                </div>

                <div id="buttom_contener_introduction_text">


                </div>
            </div>
        )
    }

}

export default Home;