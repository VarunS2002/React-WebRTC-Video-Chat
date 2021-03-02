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

export default UserToCallPage
