import React from "react";
import {Link, withRouter} from "react-router-dom";


export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: null,
            error: null
        }
    }

    componentDidMount() {
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
        this.fetchItems();
    }

    async fetchItems() {

        const url = "/api/items";

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving list of items: " + err,
                items: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                items: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                items: null
            });
        }
    }


    render() {

        const user = this.props.user;

        let table;

        if (this.state.error !== null) {
            table = <p>{this.state.error}</p>
        } else if (this.state.items === null || this.state.items.length === 0) {
            table = <p>There is no items registered in the database</p>
        } else {
            table = <div>
                <table className="allBooks">
                    <thead>
                    <tr>
                        <th>itemName</th>
                        <th>description</th>
                        <th>starting Price</th>
                        <th>current Bid</th>
                        <th>Bid on Item</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.items.map(b =>
                        <tr key={"key_" + b.id} className="oneBook" >
                            <td>{b.itemName}</td>
                            <td>{b.description}</td>
                            <td>{b.startingPrice}</td>
                            <td>{b.currentBid}</td>
                            <td>
                                <Link to={"/bid?itemId=" + b.id}>
                                    <button className="btn">
                                        <i className="fas fa-edit"></i>
                                        <p>Bid</p>
                                    </button>
                                </Link>
                                </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        }

        return(

            <div className="menuWrapper">
                <div>

                    <p>Welcome to the home page</p>

                </div>

                {user ? (
                    <div>
                        <p>Click the button to see all items</p>
                        <p>Logged in!</p>

                        <div>
                        <h2>Item List</h2>
                        <Link to={"/create"}>
                            <button className="btn">New</button>
                        </Link>
                        {table}
                    </div>

                    </div>
                ) : (
                    <div>
                        <p>
                            Log in/sign up to see all the items
                        </p>
                    </div>
                )}

            </div>
        )
    }

}

export default withRouter(Home);