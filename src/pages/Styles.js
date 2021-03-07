import {makeStyles} from "@material-ui/core/styles";
// eslint-disable-next-line
import {ClassNameMap} from '@material-ui/core/styles/withStyles';
// eslint-disable-next-line
import {Theme} from '@material-ui/core/styles/createMuiTheme';


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
    avatar_end_call: {
        margin: "auto",
        backgroundColor: '#e52f2f',
        color: "white",
        cursor: "pointer",
        padding: "25px",
        marginRight: "5px"
    },
    avatar_mute_remote: {
        margin: "auto",
        backgroundColor: 'grey',
        color: "white",
        cursor: "pointer",
        padding: "25px",
        marginLeft: "5px"
    },
}));

export {
    light,
    dark,
    useStyles
}
