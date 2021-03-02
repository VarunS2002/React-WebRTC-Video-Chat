import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ThemeProvider} from '@material-ui/core'
import {createMuiTheme} from '@material-ui/core/styles'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined'

const light = {palette: {type: 'light'}}
const dark = {palette: {type: 'dark'}}
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

function UserLoginPage(props) {
    const classes = useStyles();
    const [theme, setTheme] = useState(true)
    const appliedTheme = createMuiTheme(theme ? light : dark, {
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
                            onChange={(event) => props.setUsername(event.target.value)}
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
                            onClick={props.onLoginClicked}
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
                            onClick={() => setTheme(!theme)}
                        >
                            Switch Theme
                        </Button>
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    );
}

function UserToCallPage(props) {
    const classes = useStyles();
    const [theme, setTheme] = useState(true)
    const appliedTheme = createMuiTheme(theme ? light : dark, {
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
                            onChange={(event) => props.setUserToCall(event.target.value)}
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
                            onClick={props.onStartCallClicked}
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
                            onClick={() => setTheme(!theme)}
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
