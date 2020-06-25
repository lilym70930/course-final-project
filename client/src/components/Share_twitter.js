import React from 'react';
import '../css fils/ShareTwitter.css';
import ShareButton from 'react-social-share-buttons';

function ShareTwitter({ }) {
    return (
        <div className="twitter_button_share">

            <ShareButton
                compact
                socialMedia={'twitter'}
                url={"https://www.meetup.com/"}
                media={"https://imgs.xkcd.com/comics/error_code.png"}
                text="let's meet!"
            />
        </div>
    );
}

export default ShareTwitter;
