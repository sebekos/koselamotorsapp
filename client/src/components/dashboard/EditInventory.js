import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { Card, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Container = styled.div``;

const StyledCard = styled(Card)`
    margin: 0.5rem auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 0.3rem;
    display: grid;
    grid-template-columns: 300px auto;
`;

const ImageContainer = styled.div`
    max-height: 200px;
    width: 300px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: black;
`;

const Image = styled.img`
    width: 300px;
    min-height: 200px;
    margin: auto;
    @media (max-width: 680px) {
        width: fit-content;
        border-right: none;
    }
`;

const InfoContainer = styled.div`
    padding: 0.3rem;
`;

const TitleText = styled.div`
    font-size: 1rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.3rem;
`;

const BodyText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    & > button {
        margin-bottom: 0.5rem;
    }
`;

const MainButton = styled(Button)`
    width: 175px;
`;

const InventoryItem = ({ name, history, id }) => {
    return (
        <StyledCard>
            <ImageContainer>
                <Image />
            </ImageContainer>
            <InfoContainer>
                <TitleText>{name}</TitleText>
                <BodyText>
                    <MainButton onClick={() => history.push(`/addphotos/${id}`)} variant="contained" color="primary">
                        Add Photos
                    </MainButton>
                    <MainButton variant="contained" color="primary">
                        Edit Info
                    </MainButton>
                    <MainButton variant="contained" color="primary">
                        Sort Photos
                    </MainButton>
                    <MainButton variant="contained" color="primary">
                        Delete Car
                    </MainButton>
                    <MainButton variant="contained" color="primary">
                        Delete Images
                    </MainButton>
                </BodyText>
            </InfoContainer>
        </StyledCard>
    );
};

const Empty = () => {
    return <div>No Items</div>;
};

const EditInventory = ({ car_items, loading }) => {
    const history = useHistory();

    if (!loading && car_items.length === 0) return <Empty />;

    return (
        <Container>
            {car_items.map((item) => {
                const { _id, name } = item;
                return <InventoryItem key={v4()} item={item} history={history} name={name} id={_id} />;
            })}
        </Container>
    );
};

EditInventory.propTypes = {
    car_items: PropTypes.array
};

export default EditInventory;
