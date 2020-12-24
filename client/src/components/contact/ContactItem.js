import React from "react";
import Typography from "@material-ui/core/Typography";
import { Card, CardContent } from "@material-ui/core";
import { v4 } from "uuid";
import styled from "styled-components";

const Container = styled.div`
    margin: auto;
`;

const CardContainer = styled(Card)`
    width: 250px;
    height: 300px;
    margin: 10px;
    border: 1px solid #e8e8e8;
`;

const CardContentContainer = styled(CardContent)`
    position: relative;
    height: 100%;
`;

const types = (type, text) => {
    switch (type) {
        case "text":
            return (
                <Typography style={{ marginTop: ".5rem", fontSize: 15 }} gutterBottom>
                    {text}
                </Typography>
            );
        case "email":
            return (
                <Typography style={{ marginTop: ".5rem", fontSize: 15 }} gutterBottom>
                    <a href={`mailto:${text}`}>{text}</a>
                </Typography>
            );
        case "phone":
            return (
                <Typography style={{ marginTop: ".5rem", fontSize: 15 }} gutterBottom>
                    <a href="tel:1-630-433-8701">{text}</a>
                </Typography>
            );
        default:
            return (
                <Typography style={{ marginTop: ".5rem", fontSize: 15 }} gutterBottom>
                    {text}
                </Typography>
            );
    }
};

const Item = ({ icon, data: { title, text } }) => {
    return (
        <Container>
            <CardContainer key={v4()}>
                <CardContentContainer>
                    <div>
                        <i className={icon}></i>
                    </div>
                    <Typography style={{ marginTop: ".5rem", fontWeight: "bold", fontSize: 20 }} gutterBottom align="center">
                        {title}
                    </Typography>
                    {text.map((o) => {
                        const { type, text } = o;

                        return <div key={v4()}>{types(type, text)}</div>;
                    })}
                </CardContentContainer>
            </CardContainer>
        </Container>
    );
};

export default Item;
