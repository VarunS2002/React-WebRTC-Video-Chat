import React from 'react'
import './App.css'
import VideoChatContainer from './VideoChatContainer'

function App() {
    return (
        <div className='app'>
            <h1>React Video Chat</h1>
            <h2 style={{marginTop: "5px", marginBottom: "0px"}}>WebRTC + Firebase</h2>
            <VideoChatContainer/>
        </div>
    )
}

export default App;
