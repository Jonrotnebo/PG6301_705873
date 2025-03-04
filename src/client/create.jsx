// Disclaimer: I Did not write this file. Minor changes/Alterations from repo, se link below
// Link:https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/client/create.jsx

import React from "react";
import Item from "./item";

export class Create extends React.Component{

    constructor(props){
        super(props);
    }

    onOk = async (itemName, description, startingPrice, currentBid, sold, owner, itemId) => {

        const url = "/api/items";

        //note: here itemId is ignored
        const payload = {itemName, description, startingPrice, currentBid, sold, owner};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            return false;
        }

        return response.status === 201;
    };


    render(){

        return(
            <div>
                <h3>Create a New Item</h3>
                <Item
                    user={this.props.user}
                    itemName={""}
                    description={""}
                    startinPrice={""}
                    currentBid={""}
                    sold={""}
                    owner={this.props.user.maker}
                    ok={"Create"}
                    okCallback={this.onOk}
                />
            </div>
        );
    }
}