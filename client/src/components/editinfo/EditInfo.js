import React, { Component } from "react";
import { Form, Segment } from "semantic-ui-react";
import { updateInventory, getOneInventory } from "../../redux/actions/inventory";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 7rem 0 0;
    height: 100vh;
`;

export class EditInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            name: "",
            description: "",
            status: "For Sale"
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRadio = this.onRadio.bind(this);
        this.props.getOneInventory(this.props.match.params.id);
    }
    componentDidUpdate(prevProps) {
        if (!this.props.loading && prevProps.car_item !== this.props.car_item) {
            const { _id, name, description, status } = this.props.car_item;
            this.setState({
                _id,
                name,
                description,
                status
            });
        }
    }
    onChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }
    onRadio(e, { value }) {
        this.setState({
            ...this.state,
            status: value
        });
    }
    onSubmit() {
        this.props.updateInventory(this.state);
    }
    render() {
        return (
            <Container>
                <Segment style={{ maxWidth: 700, margin: "auto" }}>
                    <Form onSubmit={this.onSubmit} loading={this.props.loading || this.props.update_loading}>
                        <Form.Group widths="equal">
                            <Form.Input fluid label="Title" placeholder="Title" onChange={this.onChange} name="name" value={this.state.name} />
                        </Form.Group>
                        <Form.TextArea
                            label="Description"
                            placeholder="Tell us more about the car..."
                            onChange={this.onChange}
                            name="description"
                            value={this.state.description}
                            style={{ maxHeight: 300 }}
                        />
                        <Form.Group inline>
                            <label>Status</label>
                            <Form.Radio label="For Sale" value="For Sale" checked={this.state.status === "For Sale"} onChange={this.onRadio} name="status" />
                            <Form.Radio label="Sold" value="Sold" checked={this.state.status === "Sold"} onChange={this.onRadio} name="status" />
                        </Form.Group>
                        <Form.Group inline>
                            <Form.Button type="submit" disabled={this.props.loading}>
                                Save
                            </Form.Button>
                            <Link to="/dashboard">
                                <Form.Button type="submit" disabled={this.props.loading} color="blue">
                                    Go Back
                                </Form.Button>
                            </Link>
                        </Form.Group>
                    </Form>
                </Segment>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.inventory.loading,
    update_loading: state.inventory.update_inventory_loading,
    car_item: state.inventory.car_item
});

const mapDispatchToProps = {
    updateInventory,
    getOneInventory
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);
