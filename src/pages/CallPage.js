import React from "react";
// eslint-disable-next-line
import {ClassNameMap} from '@material-ui/core/styles/withStyles';
import Avatar from "@material-ui/core/Avatar";
import CallEndOutlinedIcon from '@material-ui/icons/CallEndOutlined';
import {useStyles} from "./Styles";

/**
 * Call Page functional component.
 * Displays the video streams in frames.
 * When you log in, it displays your own video stream.
 * It displays the video streams of both the users when a call is active.
 * It also displays the option buttons when a call is active.
 *
 * @param {boolean} isLoggedIn
 * @param {string} username
 * @param {function(React.RefObject<HTMLVideoElement>): void} setLocalVideoRef
 * @param {string} connectedUser
 * @param {function(React.RefObject<HTMLVideoElement>): void} setRemoteVideoRef
 * @param {function(): void} onEndCallClicked
 *
 * @return {JSX.Element}
 *
 * @constructor
 */
function CallPage({isLoggedIn, username, setLocalVideoRef, connectedUser, setRemoteVideoRef, onEndCallClicked}) {
    /** @type {ClassNameMap<"button" | "paper" | "form" | "avatar" | "avatar_end_call">} */
    const classes = useStyles();

    return (
        <div>
            {/*Hide the video tag until user has logged in*/}
            <div className={isLoggedIn ? 'videos active' : 'videos'}>
                {/*Displays your video stream*/}
                <div>
                    <label>{username}</label>
                    <video ref={setLocalVideoRef} autoPlay playsInline muted="muted"/>
                </div>
                {/*Displays the other person's video stream*/}
                <div>
                    <label>{connectedUser}</label>
                    <video ref={setRemoteVideoRef} autoPlay playsInline/>
                </div>
            </div>
            {/*Creates the Option buttons if a call is active*/}
            {connectedUser && <div className="options">
                <Avatar
                    className={classes.avatar_end_call}
                    onClick={onEndCallClicked}
                    id="end-call-btn"
                >
                    <CallEndOutlinedIcon>
                        End Call
                    </CallEndOutlinedIcon>
                </Avatar>
            </div>}
        </div>
    )
}

export default CallPage
