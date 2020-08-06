// Disclaimer: I Did not write this file. Minor changes/Alterations from repo, se link below
// Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/client/edit.jsx

import React from "react";
import ActionBid from "./auctionBid";

export class Bid extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            item: null,
            error: null
        };

        this.itemId = new URLSearchParams(window.location.search).get("itemId");

        if (this.itemId === null) {
            this.state.error = "Unspecified item id";
        }
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
        this.fetchItem();
    }

    async fetchItem() {

        const url = "/api/items/" + this.itemId;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving item: " + err,
                item: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                item: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                item: null
            });
        }
    }


    onOk = async (itemName, description, startingPrice, currentBid, sold, owner, id) => {

        const url = "/api/items/" + id;

        const payload = {id, itemName, description, startingPrice, sold, owner, currentBid};

        let response;

        try {
            response = await fetch(url, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            return false;
        }

        return response.status === 204;
    };


    render() {

        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;


        if (this.state.error !== null) {
            return (
                <div>
                    <p>Cannot bid on item. {this.state.error}</p>
                </div>
            );
        }

        if (this.state.item === null) {
            return (<p>Loading...</p>);
        }

        return (

            <div>
                {loggedIn ? (
                    <div>
                        <h3>Bid on Item</h3>
                        <ActionBid
                            itemName={this.state.item.itemName}
                            description={this.state.item.description}
                            startingPrice={this.state.item.startingPrice}
                            currentBid={this.state.item.currentBid}
                            sold={this.state.item.sold}
                            owner={this.state.item.owner}
                            itemId={this.itemId}
                            ok={"Update"}
                            okCallback={this.onOk}
                        />
                    </div>
                        )  : (
                            <div>
                                <p> Log Inn to bid on items!</p>
                            </div>
                            )}
                        </div>
            );
    }
}