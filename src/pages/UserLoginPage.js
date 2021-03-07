import React, {useState} from "react";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
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
/** @type {boolean} */
let isUsernameValid = false

/**
 * Validates the entered username.
 * Username must have only letters and numbers and has to be from 4-20 characters long.
 *
 * @param {boolean} onClick
 *
 * @return {boolean}
 */
const validateUsername = (onClick = false) => {
    // Regex Expression to match only letters and numbers
    /** @type RegExp */
    const regexAlphaNumeric = /^[0-9a-zA-Z]+$/
    // Matches the expression with the username
    /** @type {boolean} */
    const isAlphaNumeric = !!yourUsername.match(regexAlphaNumeric)
    if (onClick && !isAlphaNumeric) {
        alert("User ID must have only letters and numbers")
        return false
    }
    // Validates length of the yourUsername (4-20 characters)
    /** @type {boolean} */
    const is4to20Characters = yourUsername.length >= 4 && yourUsername.length <= 20
    if (onClick && !is4to20Characters) {
        alert("User ID must be from 4-20 characters long")
        return false
    }

    return isAlphaNumeric && is4to20Characters
}

/**
 * User Login Page Form functional component using Material UI components.
 *
 * @param {function(string): void} setUsername
 * @param {function(): Promise<void>} onLoginClicked
 *
 * @return {JSX.Element}
 *
 * @constructor
 */
function UserLoginPage({setUsername, onLoginClicked}) {
    /** @type {ClassNameMap<"button" | "paper" | "form" | "avatar" | "avatar_end_call" | "avatar_mute_remote">} */
    const classes = useStyles();
    /** @type {[boolean, Dispatch<SetStateAction<boolean>>]} */
    const [isDarkTheme, setTheme] = useState(true)
    /** @type {Theme} */
    const appliedTheme = createMuiTheme(isDarkTheme ? dark : light, {
        palette: {primary: {main: '#1A73E8'}}
    })

    return (
        <ThemeProvider theme={appliedTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleOutlinedIcon/>
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
                            id="login-input"
                            onChange={(event) => {
                                yourUsername = event.target.value
                                // Sets value of isUsernameValid everytime you update the TextField
                                isUsernameValid = validateUsername()
                                setUsername(event.target.value)
                            }}
                            label="User ID"
                            autoFocus
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            id="login-btn"
                            onClick={() => isUsernameValid ? onLoginClicked() : validateUsername(true)}
                        >
                            Log In
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

export default UserLoginPage
