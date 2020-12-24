import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { Grid, Button, Container, Segment } from "semantic-ui-react";
import { deleteInventory } from "../../redux/actions/inventory";
import { connect } from "react-redux";

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

const InfoContainer = styled.div``;

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
    grid-row-gap: 0.5rem;
    justify-items: center;
    & > button {
        width: 95%;
        margin: 0.5rem;
    }
`;

const InventoryItem = ({ name, history, id, deleteInventory, thumbnail }) => {
    const onDelete = () => {
        const r = window.confirm("Press OK to confirm delete");
        if (r !== true) return;
        deleteInventory(id);
    };
    return (
        <Grid.Column style={{ width: "max-content", margin: ".3rem 0" }}>
            <Segment>
                <ImageContainer>
                    <Image src={thumbnail} />
                </ImageContainer>
                <InfoContainer>
                    <TitleText>{name}</TitleText>
                    <BodyText>
                        <Button onClick={() => history.push(`/inventory/${id}`)}>View</Button>
                        <Button onClick={() => history.push(`/addphotos/${id}`)}>Add Photos</Button>
                        <Button onClick={() => history.push(`/editinfo/${id}`)}>Edit Info</Button>
                        <Button>Sort Photos</Button>
                        <Button onClick={onDelete} color="red">
                            Delete Car
                        </Button>
                        <Button onClick={() => history.push(`/deletephotos/${id}`)}>Delete Images</Button>
                    </BodyText>
                </InfoContainer>
            </Segment>
        </Grid.Column>
    );
};

const Empty = () => {
    return <div style={{ width: "100%", textAlign: "center" }}>No Inventory</div>;
};

const EditInventory = ({ car_items, loading, deleteInventory }) => {
    const history = useHistory();

    if (!loading && car_items.length === 0) return <Empty />;

    return (
        <Container>
            <Grid className="centered">
                {car_items.map((item) => {
                    const { _id, name, photos } = item;
                    const thumbIndex = photos.findIndex((element) => element.includes("thumb"));
                    const thumbnail = photos[thumbIndex];
                    return <InventoryItem key={v4()} item={item} history={history} name={name} id={_id} deleteInventory={deleteInventory} thumbnail={thumbnail} />;
                })}
            </Grid>
        </Container>
    );
};

EditInventory.propTypes = {
    car_items: PropTypes.array
};

const mapDispatchToProps = {
    deleteInventory
};

export default connect(null, mapDispatchToProps)(EditInventory);
