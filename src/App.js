import React from 'react';
import './App.css';
import VideoChatContainer from './video_chat/VideoChatContainer';

function App() {
    return (
        <div className='app'>
            <h1>Video Chat</h1>
            <h2>React + WebRTC + Firebase</h2>
            <VideoChatContainer/>
        </div>
    );
}

export default App;
