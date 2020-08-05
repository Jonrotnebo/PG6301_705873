import React from "react";
import {Link, withRouter} from 'react-router-dom'


class Item extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemName: this.props.itemName ? this.props.itemName : "",
            description: this.props.description ? this.props.description : "",
            startingPrice: this.props.startingPrice ? this.props.startingPrice : "",
            currentBid: this.props.currentBid ? this.props.currentBid : ""
        };

        this.ok = this.props.ok ? this.props.ok : "Ok";
    }

    onFormSubmit = async (event) => {

        event.preventDefault();

        const completed = await this.props.okCallback(
            this.state.itemName,
            this.state.description,
            this.state.startingPrice,
            this.state.currentBid,
            this.props.itemId);


        if(completed) {
            this.props.history.push('/');
        } else {
            //we use alert() just for simplicity for this example...
            alert("Failed to create new Item")
        }
    };

    onItemChange = (event) => {
        this.setState({itemName: event.target.value});
    };

    onDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    };

    onPriceChange = (event) => {
        this.setState({startingPrice: event.target.value});
    };

    onCurrentPriceChange = (event) => {
        this.setState({currentBid: event.target.value});
    };

    render() {

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <div className="inputTitle">itemName:</div>
                    <input
                        placeholder={"Type in the itemName"}
                        value={this.state.itemName}
                        onChange={this.onItemChange}
                        className="bookInput"
                    />
                    <div className="inputTitle">description:</div>
                    <input
                        placeholder={"Type in the itemName"}
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        className="bookInput"
                    />

                    <div className="inputTitle">startingPrice:</div>
                    <input
                        placeholder={"Type in the itemName"}
                        value={this.state.startingPrice}
                        onChange={this.onPriceChange}
                        className="bookInput"
                    />

                    <div className="inputTitle">currentBid:</div>
                    <input
                        placeholder={"Type the price of this item"}
                        value={this.state.currentBid}
                        onChange={this.onCurrentPriceChange}
                        className="bookInput"
                    />

                    <button type="submit" className={"btn"}>{this.ok}</button>
                    <Link to={"/"}><button className={"btn"}>Cancel</button></Link>
                </form>
            </div>
        );
    }
}


export default withRouter(Item);