import React from 'react'
import '../App.css'
import 'firebase/database'
import {endCall} from "../modules/WebRTCModule"

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
     * @return {void}
     */
    onStartCallClicked = () => {
        this.props.startCall(this.state.username, this.state.userToCall)
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
    bindEnterKey(event) {
        if (event.key === "Enter" && document.activeElement.id === "login-input") {
            document.getElementById("login-btn").click()
        } else if (event.key === "Enter" && document.activeElement.id === "contact-input") {
            try {
                document.getElementById("call-btn").click()
            } catch (exception) {
                console.log(exception)
            }
        }
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
            <div className='form'>
                <label>Enter your username:</label>
                <input value={this.state.username} type="text" id="login-input" autoFocus
                       onChange={e => this.setState({username: e.target.value})}/>
                <button onClick={this.onLoginClicked} id="login-btn" className="btn btn-primary">Login</button>
            </div>
            :
            // Rendered if user has logged in
            <div className='form'>
                <label>Enter contact name to call:</label>
                <input value={this.state.userToCall} type="text" id="contact-input" autoFocus
                       onChange={e => this.setState({userToCall: e.target.value})}/>
                <button onClick={this.onStartCallClicked} id="call-btn" className="btn btn-primary">Call</button>
            </div>
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
