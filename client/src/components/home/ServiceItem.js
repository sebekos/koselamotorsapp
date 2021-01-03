import React from "react";
import Typography from "@material-ui/core/Typography";
import { Card, CardContent } from "@material-ui/core";
import { v4 } from "uuid";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    margin: auto;
`;

const CardContainer = styled(Card)`
    width: 250px;
    margin: 10px;
    border: 1px solid #e8e8e8;
`;

const CardContentContainer = styled(CardContent)`
    position: relative;
    height: 100%;
`;

const Item = ({ icon, title, text, link }) => {
    return (
        <Link to={link}>
            <Container>
                <CardContainer key={v4()}>
                    <CardContentContainer>
                        <div>
                            <i className={icon}></i>
                        </div>
                        <Typography style={{ marginTop: ".5rem", fontWeight: "bold" }} gutterBottom align="center">
                            {title}
                        </Typography>
                        {/* <Typography variant="body2" component="p" gutterBottom>
                        {text}
                    </Typography> */}
                    </CardContentContainer>
                </CardContainer>
            </Container>
        </Link>
    );
};

export default Item;
