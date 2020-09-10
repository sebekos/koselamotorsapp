import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import { uuid } from "uuidv4";

const useStyles = makeStyles({
    container: {
        margin: "auto"
    },
    root: {
        width: 390,
        height: 300,
        margin: 5,
        border: "1px solid #E8E8E8"
    },
    media: {
        height: 0,
        paddingTop: "61.25%",
        margin: "-20px -20px 0 -20px"
    },
    content: {
        position: "relative",
        height: "100%"
    },
    title: {
        marginTop: ".5rem",
        fontSize: 14
    },
    text: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
    }
});

const Item = ({ icon, title, text }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Card className={classes.root} key={uuid()}>
                <CardContent className={classes.content}>
                    <div className="service-icon">
                        <i className={icon}></i>
                    </div>
                    <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                        {title}
                    </Typography>
                    <Typography className={classes.text} variant="body2" component="p" gutterBottom>
                        {text}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Item;
