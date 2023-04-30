import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5),
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        "& .MuiButton-label": {
            color: theme.palette.secondary.main,
        },
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        "& .MuiButton-label": {
            color: theme.palette.primary.main,
        },
    },
    error: {
        // backgroundColor: theme.palette.error.light,
        "& .MuiButton-label": {
            color: theme.palette.error.main,
        },
    },
    warning: {
        backgroundColor: theme.palette.warning.light,
        "& .MuiButton-label": {
            color: theme.palette.warning.main,
        },
    },
    info: {
        backgroundColor: theme.palette.info.light,
        "& .MuiButton-label": {
            color: theme.palette.info.main,
        },
    },
    success: {
        // backgroundColor: theme.palette.success.light,
        "& .MuiButton-label": {
            color: theme.palette.success.main,
        },
    },
}));

export default function ActionButton(props) {
    const { color , children, onClick, startIcon, disabled  } = props;
    const classes = useStyles();

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}
            startIcon={startIcon}
            disabled={disabled}
            variant="outlined"
        >
            {children}
        </Button>
    );
}