import React from "react";
import ServiceItem from "./ServiceItem";
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: max-content;
    margin: 2rem auto 0;
    text-align: center;
`;

const Boxes = () => {
    return (
        <Container>
            <ServiceItem
                icon="fas fa-car-crash fa-7x"
                title="Maintenance"
                text="Stay up to date with regular maintenance and affordable auto service when you bring your new or used vehicle"
            />
            <ServiceItem
                icon="fas fa-tools fa-7x"
                title="Engine Work"
                text="We rebuild long and short block engines, cylinder heads and crankshafts and afterwards they are equivalent or better than new"
            />
            <ServiceItem
                icon="fas fa-toolbox fa-7x"
                title="Custom Builds"
                text="When only a one-of-a-kind car will do, custom car builds are the answer. Kosela Motorsports has constructed many vehicles from the ground up"
            />
        </Container>
    );
};

export default Boxes;
