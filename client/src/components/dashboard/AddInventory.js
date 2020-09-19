import React, { useState } from "react";
import { TextareaAutosize, TextField, Card, Button, Radio } from "@material-ui/core";
import { addInventory } from "../../redux/actions/inventory";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
    padding: 1rem;
`;

const StyledCard = styled(Card)`
    margin: auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 1rem;
`;

const AddRow1 = styled.div`
    display: grid;
    grid-template-columns: 3fr;
    & > div:first-child {
        margin-right: 0.5rem;
    }
`;

const AddRow2 = styled.div``;

const AddRow3 = styled.div`
    margin: 0.5rem 0 0rem;
    vertical-align: middle;
`;

const AddRow4 = styled.div`
    margin: 0.5rem 0 0rem;
`;

const AddInventory = ({ addInventory }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "For Sale"
    });

    const { name, description, status } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = () => {
        addInventory(formData);
    };

    return (
        <Container>
            <StyledCard>
                <AddRow1>
                    <TextField
                        autoComplete="off"
                        onChange={onChange}
                        label="Name"
                        variant="filled"
                        value={name}
                        name="name"
                        inputProps={{
                            maxLength: 42
                        }}
                        helperText={`${name.length}/${42}`}
                    />
                </AddRow1>
                <AddRow2>
                    <TextareaAutosize
                        autoComplete="off"
                        placeholder="Description"
                        name="description"
                        onChange={onChange}
                        value={description}
                        type="text"
                        rowsmin={3}
                        maxLength={500}
                    />
                </AddRow2>
                <AddRow3>
                    <Radio checked={status === "For Sale"} onChange={onChange} value="For Sale" name="status" />
                    For Sale
                    <Radio checked={status === "Sold"} onChange={onChange} value="Sold" name="status" />
                    Sold
                </AddRow3>
                <AddRow4>
                    <Button onClick={onSubmit} variant="contained" color="primary">
                        Add
                    </Button>
                </AddRow4>
            </StyledCard>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    loading: state.photo.loading
});

const mapDispatchToProps = {
    addInventory
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
