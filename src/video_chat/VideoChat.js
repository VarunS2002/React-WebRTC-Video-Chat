import React from 'react'
import '../App.css'
import 'firebase/database'
import {endCall} from "../modules/WebRTCModule"
import UserLoginPage from "../pages/UserLoginPage"
import UserToCallPage from "../pages/UserToCallPage"
import CallPage from "../pages/CallPage"

class VideoChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            /** @type {boolean} */
            isLoggedIn: false,
            /** @type {string} */
            userToCall: '',
            /** @type {string} */
            username: '',
            /** @type {boolean} */
            isDarkTheme: true
        }
    }

    /**
     * Toggles value of theme in the state.
     *
     * @return {void}
     */
    switchTheme = () => {
        this.setState({
            isDarkTheme: !this.state.isDarkTheme
        })
    }

    /**
     * It calls the onLogin function and passes the required parameter.
     * It is called when the Login button is clicked.
     *
     * @return {Promise<void>}
     */
    onLoginClicked = async () => {
        await this.props.onLogin(this.state.username)
        this.setState({
            isLoggedIn: true
        })
    }

    /**
     * It calls the startCall function and passes the required parameters.
     * It is called when the Call button is clicked.
     *
     * @return {Promise<void>}
     */
    onStartCallClicked = async () => {
        await this.props.startCall(this.state.username, this.state.userToCall)
    }

    /**
     * It calls the endCall function.
     * It is called when the End Call button is clicked.
     *
     * @return {void}
     */
    onEndCallClicked = () => {
        this.setState({
            youDisconnected: true
        })
        endCall()
    }

    /**
     * Displays the video frames and the calling screen.
     *
     * @return {JSX.Element}
     */
    renderVideos() {
        return <CallPage isLoggedIn={this.state.isLoggedIn}
                         username={this.state.username}
                         setLocalVideoRef={this.props.setLocalVideoRef}
                         connectedUser={this.props.connectedUser}
                         setRemoteVideoRef={this.props.setRemoteVideoRef}
                         onEndCallClicked={this.onEndCallClicked}
        />
    }

    /**
     * Sets the value of username in the state.
     *
     * @param {string} username
     *
     * @return {void}
     */
    setUsername = (username) => {
        this.setState({username: username})
    }

    /**
     * Sets the value of userToCall in the state.
     *
     * @param {string} userToCall
     *
     * @return {void}
     */
    setUserToCall = (userToCall) => {
        this.setState({userToCall: userToCall})
    }

    /**
     * Creates the Login Form.
     * It is the first page and remains active until a call starts.
     *
     * @return {JSX.Element}
     */
    renderForms() {
        // Renders the form
        return !this.state.isLoggedIn ?
            // Rendered if user has not logged in
            <UserLoginPage
                setUsername={this.setUsername}
                onLoginClicked={this.onLoginClicked}
                isDarkThemeState={this.state.isDarkTheme}
                switchTheme={this.switchTheme}
            />
            :
            // Rendered if user has logged in
            <UserToCallPage
                username={this.state.username}
                setUserToCall={this.setUserToCall}
                onStartCallClicked={this.onStartCallClicked}
                isDarkThemeState={this.state.isDarkTheme}
                switchTheme={this.switchTheme}
            />
    }

    /**
     * Renders all the Elements including the Login form, Video frames and the Options.
     * Chooses what to render based on certain conditions.
     * This is the entry point of the website.
     *
     * @return {JSX.Element}
     */
    render() {
        return <section id="container" className={this.props.connectedUser ? 'container-call' : 'container-login'}>
            {/*Renders Login form if a call is not active*/}
            {this.props.connectedUser ? null : this.renderForms()}
            {/*Renders the video streams with the options*/}
            {this.renderVideos()}
        </section>
    }
}

export default VideoChat
