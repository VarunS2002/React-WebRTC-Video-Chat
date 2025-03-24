import React, {useState} from "react"
import {createTheme} from "@material-ui/core/styles"
import {ThemeProvider} from "@material-ui/core"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Avatar from "@material-ui/core/Avatar"
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
// eslint-disable-next-line
import {ClassNameMap} from '@material-ui/core/styles/withStyles'
// eslint-disable-next-line
import {Theme} from '@material-ui/core/styles/createTheme'
import {dark, light, useStyles} from "./Styles"

/** @type {string} */
let yourUsername = ''
/** @type {boolean} */
let isUsernameValid = false

/**
 * Validates the entered username.
 * Username must have only letters and numbers.
 * It has to be from 4-20 characters long.
 *
 * @param {boolean} showMistakes
 *
 * @return {boolean}
 */
const validateUsername = (showMistakes = false) => {
    // Validates whether username is empty
    /** @type {boolean} */
    const isNotEmpty = yourUsername.length !== 0
    if (showMistakes && !isNotEmpty) {
        alert("User ID cannot be empty")
        return false
    }
    // Regex Expression to match only letters and numbers
    /** @type RegExp */
    const regexAlphaNumeric = /^[0-9a-zA-Z]+$/
    // Matches the expression with the username
    /** @type {boolean} */
    const isAlphaNumeric = !!yourUsername.match(regexAlphaNumeric)
    if (showMistakes && !isAlphaNumeric) {
        alert("User ID must have only letters and numbers")
        return false
    }
    // Validates length of the yourUsername (4-20 characters)
    /** @type {boolean} */
    const is4to20Characters = yourUsername.length >= 4 && yourUsername.length <= 20
    if (showMistakes && !is4to20Characters) {
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
 * @param {function(): void} switchTheme
 *
 * @return {JSX.Element}
 *
 * @constructor
 */
function UserLoginPage({setUsername, onLoginClicked, switchTheme}) {
    /** @type {ClassNameMap<"button" | "avatar_enabled" | "paper" | "form" | "avatar_disabled" | "avatar" | "avatar_end_call">} */
    const classes = useStyles()
    /** @type {[boolean, Dispatch<SetStateAction<boolean>>]} */
    const [isDarkTheme, setTheme] = useState(true)
    /** @type {Theme} */
    const appliedTheme = createTheme(isDarkTheme ? dark : light, {
        palette: {primary: {main: '#1A73E8'}}
    })

    /**
     * Logs in by calling onLoginClicked if the key pressed is Enter and User ID is valid.
     * If invalid it shows the mistake by calling validateUsername with showMistakes as true.
     *
     * @param {React.KeyboardEvent<HTMLDivElement>} event
     *
     * @return {Promise<void>}
     */
    const bindEnterKey =  async (event) => {
        if (event.key === "Enter" && document.activeElement.id === "login-input") {
            if (isUsernameValid) {
                await onLoginClicked()
            } else {
                validateUsername(true)
            }
        }
    }

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
                                // Sets value of username locally
                                yourUsername = event.target.value
                                // Sets value of isUsernameValid everytime you update the TextField
                                isUsernameValid = validateUsername()
                                // Sets value of username in state
                                setUsername(event.target.value)
                            }}
                            // Sets event listener for every keypress to login if Enter key is clicked
                            onKeyPress={event => bindEnterKey(event)}
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
                            onClick={() => {
                                setTheme(!isDarkTheme)
                                switchTheme()
                            }}
                        >
                            Switch Theme
                        </Button>
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    )
}

export default UserLoginPage
