import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
// eslint-disable-next-line
import {ClassNameMap} from '@material-ui/core/styles/withStyles';
// eslint-disable-next-line
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import Container from '@material-ui/core/Container';
import {ThemeProvider} from '@material-ui/core'
import {createMuiTheme} from '@material-ui/core/styles'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined'

// Property for light theme
/** @type {{palette: {type: string}}} */
const light = {palette: {type: 'light'}}
// Property for dark theme
/** @type {{palette: {type: string}}} */
const dark = {palette: {type: 'dark'}}

/**
 * Generate styles based on the specified css properties.
 *
 * @param {Theme} theme
 *
 * @return {ClassNameMap<"button" | "paper" | "form" | "avatar">}
 */
const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#1A73E8',
        color: "white"
    },
    form: {
        width: '90%'
    },
    button: {
        margin: theme.spacing(1, 0, 0),
    },
}));


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
    /** @type {ClassNameMap<"button" | "paper" | "form" | "avatar">} */
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
                            onChange={(event) => setUsername(event.target.value)}
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
                            onClick={onLoginClicked}
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

/**
 * User to Call Page Form functional component using Material UI components.
 *
 * @param {function(string): void} setUserToCall
 * @param {function(): Promise<void>} onStartCallClicked
 *
 * @return {JSX.Element}
 *
 * @constructor
 */
function UserToCallPage({setUserToCall, onStartCallClicked}) {
    /** @type {ClassNameMap<"button" | "paper" | "form" | "avatar">} */
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
                            onChange={(event) => setUserToCall(event.target.value)}
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
                            onClick={onStartCallClicked}
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

export {
    UserLoginPage,
    UserToCallPage
}
