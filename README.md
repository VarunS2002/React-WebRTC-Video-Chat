# React-WebRTC-Video-Chat

> [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A basic one-on-one video chat app built with React, WebRTC and Firebase,
enabling real-time, peer-to-peer and serverless video communication directly in the browser.

#### This project is heavily based on the video guide made by [Masoud](https://www.youtube.com/@ReactWithMasoud) which was posted [here](https://www.youtube.com/watch?v=-d45WHNU9J4&t=3153s&ab_channel=ReactwithMasoud).

## Requirements:

- [Node.js with npm](https://nodejs.org/en/download/)

- Google account with Firebase access

## Setup:

1. Run `npm install`

2. Setup a Firebase project with Realtime Database.
   Sample guide [here](https://grotoned.medium.com/tutorial-using-firebase-as-a-realtime-database-with-react-2a3a24c1df91)

3. Update `config.js` with your Firebase project config and a public STUN server

## Usage:

1. Run `npm start`

2. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

3. Open the link in an incognito window/different browser/different machine on the same network

4. Login with a unique name in each window and allow camera and microphone permissions

5. Call the other name in one of the two windows

## Features:

- Start/End Call

- Turn-off Microphone

- Turn-off Camera

- Mute the Other Person

- Dark and Light theme

- Material Design

## Note:

- This project is a proof of concept and does not support many essential usability, privacy and security features, and 
 therefore, it should never be used in a production environment

## Screenshots:

- Login Page:

  <br>![Login_Page](https://i.imgur.com/i7YiGGq.png) <br><br>

- Call Lobby:

  <br>![Call_Lobby](https://i.imgur.com/xpmpBis.png) <br><br>

- Ongoing Call:

  <br>![Ongoing_Call](https://i.imgur.com/G748P8A.png) <br><br>
