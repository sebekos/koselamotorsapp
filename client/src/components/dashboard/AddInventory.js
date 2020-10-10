import React, { useState } from "react";
import { Form, Segment } from "semantic-ui-react";
import { addInventory } from "../../redux/actions/inventory";
import { connect } from "react-redux";

const AddInventory = ({ addInventory, loading }) => {
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

    const onRadio = (e, { value }) => {
        setFormData({
            ...formData,
            status: value
        });
    };

    const onSubmit = () => {
        addInventory(formData);
    };

    return (
        <Segment style={{ maxWidth: 700, margin: "auto" }}>
            <Form onSubmit={onSubmit} loading={loading}>
                <Form.Group widths="equal">
                    <Form.Input fluid label="Title" placeholder="Title" onChange={onChange} name="name" value={name} />
                </Form.Group>
                <Form.TextArea
                    label="Description"
                    placeholder="Tell us more about the car..."
                    onChange={onChange}
                    name="description"
                    value={description}
                    style={{ maxHeight: 100 }}
                />
                <Form.Group inline>
                    <label>Status</label>
                    <Form.Radio label="For Sale" value="For Sale" checked={status === "For Sale"} onChange={onRadio} name="status" />
                    <Form.Radio label="Sold" value="Sold" checked={status === "Sold"} onChange={onRadio} name="status" />
                </Form.Group>
                <Form.Button onClick={onSubmit} disabled={loading}>
                    Add
                </Form.Button>
            </Form>
        </Segment>
    );
};

const mapStateToProps = (state) => ({
    loading: state.inventory.add_inventory_loading
});

const mapDispatchToProps = {
    addInventory
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
