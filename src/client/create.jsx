import React from "react";
import Item from "./item";

export class Create extends React.Component{

    constructor(props){
        super(props);
    }

    onOk = async (itemName, description, startingPrice, currentBid, itemId) => {

        const url = "/api/items";

        //note: here bookId is ignored
        const payload = {itemName, description, startingPrice, currentBid};

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
                    itemName={""}
                    description={""}
                    startinPrice={""}
                    currentBid={""}
                    ok={"Create"}
                    okCallback={this.onOk}
                />
            </div>
        );
    }
}