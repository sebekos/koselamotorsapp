import React from "react";
import styled from "styled-components";
import ServiceItem from "./ContactItem";

const Container = styled.div`
    padding: 8rem 0 0;
    min-height: 100vh;
    margin: auto;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 0rem 0 1rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
    @media (max-width: 768px) {
        padding: 1rem 0 2rem;
    }
`;

const ContactInfoContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 600px;
    margin: 5rem auto 5rem;
    text-align: center;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        margin: 1rem auto;
    }
`;

const ContactCol = styled.div`
    width: fit-content;
    margin: auto;
    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const ContactInfo = () => {
    const item1Text = {
        title: "Direct",
        text: [
            { type: "text", text: "Adam Kosela" },
            { type: "phone", text: "(630) 433 - 8701" },
            { type: "email", text: "akosela@netscape.net" },
            { type: "text", text: "instagram@akosela" }
        ]
    };
    const item2Text = {
        title: "Location",
        text: [
            { type: "text", text: "Intersection I355/I88" },
            { type: "text", text: "Downers Grove" },
            { type: "text", text: "Illinois, 60516" }
        ]
    };
    return (
        <ContactInfoContainer>
            <ContactCol>
                <ServiceItem icon="fas fa-phone fa-7x" data={item1Text} />
            </ContactCol>
            <ContactCol>
                <ServiceItem icon="fas fa-map-signs fa-7x" data={item2Text} />
            </ContactCol>
        </ContactInfoContainer>
    );
};

const Contact = () => {
    return (
        <Container>
            <MainTitle>Contact</MainTitle>
            <ContactInfo />
        </Container>
    );
};

export default Contact;
