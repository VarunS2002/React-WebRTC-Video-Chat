import React from 'react';
import './App.css';
import VideoChatContainer from './video_chat/VideoChatContainer';

function App() {
    return (
        <div className='app'>
            <h1>Video Chat</h1>
            <h2 style={{marginTop: "5px", marginBottom: "0px"}}>React + WebRTC + Firebase</h2>
            <br/><br/>
            <VideoChatContainer/>
        </div>
    );
}

export default App;
