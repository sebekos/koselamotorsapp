import React from "react";
import ServiceItem from "./ServiceItem";
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: max-content;
    margin: 2rem auto 0;
    text-align: center;
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const Boxes = () => {
    return (
        <Container>
            <ServiceItem
                link="/aboutus"
                icon="fas fa-info-circle fa-7x"
                title="About Us"
                text="Stay up to date with regular maintenance and affordable auto service when you bring your new or used vehicle"
            />
            <ServiceItem
                link="/services"
                icon="fas fa-tools fa-7x"
                title="Services"
                text="We rebuild long and short block engines, cylinder heads and crankshafts and afterwards they are equivalent or better than new"
            />
            <ServiceItem
                link="/inventory"
                icon="fas fa-car-alt fa-7x"
                title="Inventory"
                text="When only a one-of-a-kind car will do, custom car builds are the answer. Kosela Motorsports has constructed many vehicles from the ground up"
            />
        </Container>
    );
};

export default Boxes;
