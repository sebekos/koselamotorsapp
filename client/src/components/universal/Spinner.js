import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";

const Container = styled.div`
    max-height: inherit;
`;

const Spinner = ({ shown, dimmer = false }) => {
    if (!dimmer) return <Loader active={shown} />;
    return (
        <Container>
            <Dimmer active={dimmer} inverted>
                <Loader />
            </Dimmer>
        </Container>
    );
};

export default Spinner;
