import React from "react";
import {Link, withRouter} from 'react-router-dom'


export class Sold extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemName: this.props.itemName ? this.props.itemName : "",
            description: this.props.description ? this.props.description : "",
            startingPrice: this.props.startingPrice ? this.props.startingPrice : "",
            currentBid: this.props.currentBid ? this.props.currentBid : "",
            sold: this.props.currentBid ? this.props.currentBid : "",
            owner: this.props.owner ? this.props.owner: ""

        };

        this.ok = this.props.ok ? this.props.ok : "Ok";
    }


    onSubmit = async (event) => {

        event.preventDefault();

        const completed = await this.props.okCallback(
            this.props.itemName,
            this.props.description,
            this.props.startingPrice,
            this.props.currentBid,
            this.state.sold,
            this.props.owner,
            this.props.itemId);


        if(completed) {
            this.props.history.push('/');
        } else {
            //we use alert() just for simplicity for this example...
            alert("Failed to create new Item")
        }
    };


    onSoldChange = (event) => {
        this.setState({sold: event.target.value});
    };

    render() {

        return (


            <div>
                <form onSubmit={this.onSubmit}>

                    <div className="inputTitle">currentBid:</div>
                    <input
                        placeholder={"Type in sold, or anything to mark as sold"}
                        value={this.state.sold}
                        onChange={this.onSoldChange}
                        className="bookInput"
                    />

                    <button type="submit" className={"btn"}>{this.ok}</button>
                    <Link to={"/"}><button className={"btn"}>Cancel</button></Link>
                </form>
            </div>

        );
    }
}


export default withRouter(Sold);