import React from "react";
import styled from "styled-components";

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
    max-width: 800px;
    margin: 5rem auto 5rem;
    text-align: center;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ContactCol = styled.div`
    width: fit-content;
    margin: auto;
    @media (max-width: 768px) {
        padding: 3rem;
    }
`;

const ContactTitle = styled.div`
    font-size: 1.7rem;
    font-weight: bold;
`;

const ContactBody = styled.p`
    font-size: 1.3rem;
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const ContactInfo = () => {
    return (
        <ContactInfoContainer>
            <ContactCol>
                <ContactTitle>Direct</ContactTitle>
                <ContactBody>Adam Kosela</ContactBody>
                <ContactBody>(630) 433 - 8701</ContactBody>
                <ContactBody>email akosela@netscape.net</ContactBody>
                <ContactBody>instgram@akosela</ContactBody>
            </ContactCol>
            <ContactCol>
                <ContactTitle>Location</ContactTitle>
                <ContactBody>Downers Grove</ContactBody>
                <ContactBody>Intersection I355/I88</ContactBody>
                <ContactBody>123 Test St</ContactBody>
                <ContactBody>Info</ContactBody>
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
