import React from "react";
import {Link, withRouter} from 'react-router-dom'


class AuctionBid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemName: this.props.itemName ? this.props.itemName : "",
            description: this.props.description ? this.props.description : "",
            startingPrice: this.props.startingPrice ? this.props.startingPrice : "",
            currentBid: this.props.currentBid ? this.props.currentBid : "",
            newBid: null

        };

        this.ok = this.props.ok ? this.props.ok : "Ok";
    }

    onFormSubmit = async (event) => {

        event.preventDefault();

        const completed = await this.props.okCallback(
            this.props.itemName,
            this.props.description,
            this.props.startingPrice,
            this.state.currentBid,
            this.props.itemId);


        if(completed) {
            this.props.history.push('/');
        } else {
            //we use alert() just for simplicity for this example...
            alert("Failed to create new Item")
        }
    };


    onCurrentPriceChange = (event) => {
        if (this.state.currentBid < this.state.newBid) {
            return false;
        }

        this.setState({currentBid: event.target.value});
    };

    render() {

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>

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


export default withRouter(AuctionBid);