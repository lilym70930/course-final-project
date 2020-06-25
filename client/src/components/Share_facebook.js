import React from 'react';
import '../css fils/Share_facebook.css';
import ShareButton from 'react-social-share-buttons';

function ShareFacebook({ }) {
    return (
        <div className="facebook_button_share">

            <ShareButton
                compact
                socialMedia={'facebook'}
                url={"https://www.meetup.com/"}
                media={"https://imgs.xkcd.com/comics/error_code.png"}
                text="Sit by a lake"
            />
        </div>
    );
}

export default ShareFacebook;
