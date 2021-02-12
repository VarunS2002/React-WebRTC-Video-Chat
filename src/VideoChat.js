import React from 'react'
import './App.css'
import 'firebase/database'

export default class VideoChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            userToCall: '',
            username: ''
        }
    }

    onLoginClicked = async () => {
        await this.props.onLogin(this.state.username)
        this.setState({
            isLoggedIn: true
        })
    }

    onStartCallClicked = () => {
        this.props.startCall(this.state.username, this.state.userToCall)
    }

    renderVideos = () => {
        return <div className={this.state.isLoggedIn ? 'videos active' : 'videos'}>
            <div>
                <label>{this.state.username}</label>

                <video ref={this.props.setLocalVideoRef} autoPlay playsInline/>
            </div>
            <div>
                <label>{this.props.connectedUser}</label>
                <video ref={this.props.setRemoteVideoRef} autoPlay playsInline/>
            </div>

        </div>
    }

    renderForms = () => {
        window.addEventListener('keypress', function (event) {
            if (event.code === "Enter" && document.activeElement.id === "login-input") {
                document.getElementById("login-btn").click();
            } else if (event.code === "Enter" && document.activeElement.id === "contact-input") {
                document.getElementById("call-btn").click();
            }
        });

        return this.state.isLoggedIn
            ? <div key='a' className='form'>
                <label>Enter contact name to call:</label>
                <input value={this.state.userToCall} type="text" id="contact-input" autoFocus
                       onChange={e => this.setState({userToCall: e.target.value})}/>
                <button onClick={this.onStartCallClicked} id="call-btn" className="btn btn-primary">Call</button>

            </div>
            : <div key='b' className='form'>
                <label>Enter your name:</label>
                <input value={this.state.username} type="text" id="login-input" autoFocus
                       onChange={e => this.setState({username: e.target.value})}/>

                <button onClick={this.onLoginClicked} id="login-btn" className="btn btn-primary">Login</button>

            </div>
    }

    render() {
        return <section id="container" style={{marginTop: "-25px"}}>
            {this.props.connectedUser ? null : this.renderForms()}

            {this.renderVideos()}

        </section>
    }
}
