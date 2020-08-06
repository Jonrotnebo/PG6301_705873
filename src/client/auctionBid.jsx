// Disclaimer: I Did not write this file. Minor changes/Alterations from repo, se link below
// Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/client/book.jsx

import React from "react";
import {Link, withRouter} from 'react-router-dom'


export class AuctionBid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemName: this.props.itemName ? this.props.itemName : "",
            description: this.props.description ? this.props.description : "",
            startingPrice: this.props.startingPrice ? this.props.startingPrice : "",
            currentBid: this.props.currentBid ? this.props.currentBid : "",
            sold: this.props.currentBid ? this.props.currentBid: true,
            owner: this.props.owner ? this.props.owner: ""

        };

        this.ok = this.props.ok ? this.props.ok : "Ok";
    }


    onFormSubmit = async (event) => {

        event.preventDefault();

        if (
            this.props.currentBid < this.state.currentBid &&
            this.props.startingPrice < this.state.currentBid
        ) {

            const completed = await this.props.okCallback(
                this.state.itemName,
                this.state.description,
                this.state.startingPrice,
                this.state.currentBid,
                this.props.sold,
                this.state.owner,
                this.props.itemId);

            if (completed) {
                this.props.history.push('/');
            } else {
                //we use alert() just for simplicity for this example...
                alert("Failed to bid on Item")
            }
        }else {
            alert("new bid os lower than current bid or start price.")
        }

    };


    onCurrentPriceChange = (event) => {
        this.setState({currentBid: event.target.value});
    };

    render() {

        return (


                    <div>
                        <form onSubmit={this.onFormSubmit}>
                            <div className="inputTitle">currentBid:</div>
                            <input
                                type="number"
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