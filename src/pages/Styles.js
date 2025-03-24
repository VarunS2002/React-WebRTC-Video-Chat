import {makeStyles} from "@material-ui/core/styles"
// eslint-disable-next-line
import {ClassNameMap} from '@material-ui/core/styles/withStyles'
// eslint-disable-next-line
import {Theme} from '@material-ui/core/styles/createTheme'


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
 * @return {ClassNameMap<"button" | "avatar_enabled" | "paper" | "form" | "avatar_disabled" | "avatar" | "avatar_end_call">}
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
        backgroundColor: "transparent",
        color: "#e52f2f",
        cursor: "pointer",
        padding: "25px",
        marginLeft: "5px",
        marginRight: "5px",
        borderColor: theme.color,
        borderStyle: "solid",
        borderWidth: 2.5
    },
    avatar_disabled: {
        margin: "auto",
        backgroundColor: "#e52f2f",
        color: "white",
        cursor: "pointer",
        padding: "25px",
        marginLeft: "5px",
        marginRight: "5px",
        borderColor: "#e52f2f",
        borderStyle: "solid",
        borderWidth: 2.5
    },
    avatar_enabled: {
        margin: "auto",
        backgroundColor: 'transparent',
        color: "grey",
        cursor: "pointer",
        padding: "25px",
        marginLeft: "5px",
        marginRight: "5px",
        borderColor: theme.color,
        borderStyle: "solid",
        borderWidth: 2.5
    },
}))

export {
    light,
    dark,
    useStyles
}
