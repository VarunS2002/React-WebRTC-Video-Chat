import React from 'react'
import '../App.css'
import 'firebase/database'
import {endCall} from "../modules/WebRTCModule"
import {UserLoginPage, UserToCallPage} from "../pages/LoginPage";

class VideoChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            /** @type {boolean} */
            isLoggedIn: false,
            /** @type {string} */
            userToCall: '',
            /** @type {string} */
            username: ''
        }
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
     * Displays the video streams in frames.
     * It is called when you log in and displays your own video stream.
     * It displays the video streams of both the users when a call is active.
     *
     * @return {JSX.Element}
     */
    renderVideos() {
        return <div className={this.state.isLoggedIn ? 'videos active' : 'videos'}>
            {/*Displays your video stream*/}
            <div>
                <label>{this.state.username}</label>
                <video ref={this.props.setLocalVideoRef} autoPlay playsInline muted="muted"/>
                {/*TODO: Self Microphone Test before call*/}
                {/*{this.props.connectedUser ?
                    <video ref={this.props.setLocalVideoRef} autoPlay playsInline muted="muted"/> :
                    <video ref={this.props.setLocalVideoRef} autoPlay playsInline/>}*/}
            </div>
            {/*Displays the other person's video stream*/}
            <div>
                <label>{this.props.connectedUser}</label>
                <video ref={this.props.setRemoteVideoRef} autoPlay playsInline/>
            </div>
        </div>
    }

    /**
     * Creates the Option buttons.
     * It is called if the call is active.
     *
     * @return {JSX.Element}
     */
    renderOptions() {
        return <div className="options">
            <button onClick={this.onEndCallClicked} id="end-call-btn" className="btn btn-primary">End Call</button>
        </div>
    }

    /**
     * Binds Enter key to click Login or click Call on their respective pages.
     *
     * @param {KeyboardEvent} event
     *
     * @return {void}
     */
    bindEnterKey = async (event) => {
        if (event.key === "Enter" && document.activeElement.id === "login-input") {
            await this.onLoginClicked()
        } else if (event.key === "Enter" && document.activeElement.id === "contact-input") {
            await this.onStartCallClicked()
        }
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
        // Sets event listener for every keypress to check if Enter key is clicked by calling bindEnterKey
        window.addEventListener('keypress', this.bindEnterKey)

        // Renders the form
        return !this.state.isLoggedIn ?
            // Rendered if user has not logged in
            <UserLoginPage
                setUsername={this.setUsername}
                onLoginClicked={this.onLoginClicked}
            />
            :
            // Rendered if user has logged in
            <UserToCallPage
                setUserToCall={this.setUserToCall}
                onStartCallClicked={this.onStartCallClicked}
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
            {/*Renders the video streams*/}
            {this.renderVideos()}
            {/*Renders the Option buttons if a call is active*/}
            {this.props.connectedUser ? this.renderOptions() : null}
        </section>
    }
}

export default VideoChat
