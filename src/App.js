import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import "./App.css";

class App extends Component {
	state = {
		users: [],
		loading: false,
	};

	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLENT_SECRET}`
	// 	);
	// 	this.setState({ loading: false, users: res.data });
	// }
	//Search GuitHub Users
	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLENT_SECRET}`
		);
		console.log(res.data)
		this.setState({ loading: false, users: res.data.items });
	};
	render() {
		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Search searchUsers={this.searchUsers} />
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;
