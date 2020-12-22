import React from "react";
import Typography from "@material-ui/core/Typography";
import { Card, CardContent } from "@material-ui/core";
import { v4 } from "uuid";
import styled from "styled-components";

const Container = styled.div`
    margin: auto;
`;

const CardContainer = styled(Card)`
    width: 600px;
    height: 350px;
    margin: 10px;
    border: 1px solid #e8e8e8;
    @media (max-width: 768px) {
        width: auto;
        height: auto;
    }
`;

const CardContentContainer = styled(CardContent)`
    position: relative;
    height: 100%;
`;

const Item = ({ title, text }) => {
    return (
        <Container>
            <CardContainer key={v4()}>
                <CardContentContainer>
                    <Typography style={{ marginTop: ".5rem", fontWeight: "bold", fontSize: 20 }} gutterBottom align="center">
                        {title}
                    </Typography>
                    <Typography style={{ marginTop: ".5rem", fontSize: 15 }} gutterBottom>
                        {text}
                    </Typography>
                </CardContentContainer>
            </CardContainer>
        </Container>
    );
};

export default Item;
