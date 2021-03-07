import React, {useState} from "react";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import VideoCallOutlinedIcon from "@material-ui/icons/VideoCallOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// eslint-disable-next-line
import {ClassNameMap} from '@material-ui/core/styles/withStyles';
// eslint-disable-next-line
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import {dark, light, useStyles} from "./Styles";

/** @type {string} */
let yourUsername = ''
/** @type {string} */
let userToCall = ''
/** @type {boolean} */
let isUserToCallValid = false

/**
 * Validates the entered userToCall.
 * User to call must have only letters and numbers and has to be from 4-20 characters long.
 *
 * @param {boolean} onClick
 *
 * @return {boolean}
 */
const validateUserToCall = (onClick = false) => {
    // Regex Expression to match only letters and numbers
    /** @type RegExp */
    const regexAlphaNumeric = /^[0-9a-zA-Z]+$/
    // Matches the expression with the userToCall
    /** @type {boolean} */
    const isAlphaNumeric = !!userToCall.match(regexAlphaNumeric)
    if (onClick && !isAlphaNumeric) {
        alert("Contact ID must have only letters and numbers")
        return false
    }
    // Validates length of the userToCall (4-20 characters)
    /** @type {boolean} */
    const is4to20Characters = userToCall.length >= 4 && userToCall.length <= 20
    if (onClick && !is4to20Characters) {
        alert("Contact ID must be from 4-20 characters long")
        return false
    }
    /** @type {boolean} */
    const notCallingYourself = userToCall !== yourUsername
    if (onClick && !notCallingYourself) {
        alert("Contact ID cannot be the same as User ID")
        return false
    }

    return isAlphaNumeric && is4to20Characters && notCallingYourself
}

/**
 * User to Call Page Form functional component using Material UI components.
 *
 * @param {string} username
 * @param {function(string): void} setUserToCall
 * @param {function(): Promise<void>} onStartCallClicked
 *
 * @return {JSX.Element}
 *
 * @constructor
 */
function UserToCallPage({username, setUserToCall, onStartCallClicked}) {
    /** @type {ClassNameMap<"button" | "paper" | "form" | "avatar" | "avatar_end_call" | "avatar_mute_remote">} */
    const classes = useStyles();
    /** @type {[boolean, Dispatch<SetStateAction<boolean>>]} */
    const [isDarkTheme, setTheme] = useState(true)
    /** @type {Theme} */
    const appliedTheme = createMuiTheme(isDarkTheme ? dark : light, {
        palette: {primary: {main: '#1A73E8'}}
    })
    yourUsername = username

    return (
        <ThemeProvider theme={appliedTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <VideoCallOutlinedIcon/>
                    </Avatar>
                    <Typography component="h2" variant="h5">
                        Video Chat
                    </Typography>
                    <div className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="contact-input"
                            onChange={(event) => {
                                userToCall = event.target.value
                                // Sets value of isUserToCallValid everytime you update the TextField
                                isUserToCallValid = validateUserToCall()
                                setUserToCall(event.target.value)
                            }}
                            label="Contact ID"
                            autoFocus
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            id="call-btn"
                            onClick={() => isUserToCallValid ? onStartCallClicked() : validateUserToCall(true)}
                        >
                            Call
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            id="theme-btn"
                            onClick={() => setTheme(!isDarkTheme)}
                        >
                            Switch Theme
                        </Button>
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default UserToCallPage
