import React, {useState} from "react"
import {createMuiTheme} from "@material-ui/core/styles"
import {ThemeProvider} from "@material-ui/core"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Avatar from "@material-ui/core/Avatar"
import VideoCallOutlinedIcon from "@material-ui/icons/VideoCallOutlined"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
// eslint-disable-next-line
import {ClassNameMap} from '@material-ui/core/styles/withStyles'
// eslint-disable-next-line
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import {dark, light, useStyles} from "./Styles"

/** @type {string} */
let yourUsername = ''
/** @type {string} */
let userToCall = ''
/** @type {boolean} */
let isUserToCallValid = false

/**
 * Validates the entered userToCall.
 * User to call must have only letters and numbers
 * It has to be from 4-20 characters long.
 * You cannot call yourself.
 *
 * @param {boolean} showMistakes
 *
 * @return {boolean}
 */
const validateUserToCall = (showMistakes = false) => {
    // Regex Expression to match only letters and numbers
    /** @type RegExp */
    const regexAlphaNumeric = /^[0-9a-zA-Z]+$/
    // Matches the expression with the userToCall
    /** @type {boolean} */
    const isAlphaNumeric = !!userToCall.match(regexAlphaNumeric)
    if (showMistakes && !isAlphaNumeric) {
        alert("Contact ID must have only letters and numbers")
        return false
    }
    // Validates length of the userToCall (4-20 characters)
    /** @type {boolean} */
    const is4to20Characters = userToCall.length >= 4 && userToCall.length <= 20
    if (showMistakes && !is4to20Characters) {
        alert("Contact ID must be from 4-20 characters long")
        return false
    }
    // Validates whether you are trying to call yourself
    /** @type {boolean} */
    const notCallingYourself = userToCall !== yourUsername
    if (showMistakes && !notCallingYourself) {
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
 * @param {boolean} isDarkThemeState
 * @param {function(): void} switchTheme
 *
 * @return {JSX.Element}
 *
 * @constructor
 */
function UserToCallPage({username, setUserToCall, onStartCallClicked, isDarkThemeState, switchTheme}) {
    /** @type {ClassNameMap<"button" | "paper" | "form" | "avatar" | "avatar_end_call" | "avatar_muted_remote" | "avatar_unmuted_remote">} */
    const classes = useStyles()
    /** @type {[boolean, Dispatch<SetStateAction<boolean>>]} */
    const [isDarkTheme, setTheme] = useState(isDarkThemeState)
    /** @type {Theme} */
    const appliedTheme = createMuiTheme(isDarkTheme ? dark : light, {
        palette: {primary: {main: '#1A73E8'}}
    })
    yourUsername = username

    /**
     * Starts call by calling onStartCallClicked if the key pressed is Enter and Contact ID is valid.
     * If invalid it shows the mistake by calling validateUserToCall with showMistakes as true.
     *
     * @param {React.KeyboardEvent<HTMLDivElement>} event
     *
     * @return {Promise<void>}
     */
    const bindEnterKey =  async (event) => {
        if (event.key === "Enter" && document.activeElement.id === "contact-input") {
            if (isUserToCallValid) {
                await onStartCallClicked()
            } else {
                validateUserToCall(true)
            }
        }
    }

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
                                // Sets value of userToCall locally
                                userToCall = event.target.value
                                // Sets value of isUserToCallValid everytime you update the TextField
                                isUserToCallValid = validateUserToCall()
                                // Sets value of userToCall in state
                                setUserToCall(event.target.value)
                            }}
                            // Sets event listener for every keypress to start call if Enter key is clicked
                            onKeyPress={event => bindEnterKey(event)}
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

export default UserToCallPage
