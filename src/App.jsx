import React from "react";
import "./styles.css";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			data: [],
			index: 0,
		};
	}

	componentDidMount() {
		const url = "https://type.fit/api/quotes";

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setTimeout(() => {
					this.setState({
						data,
						// data: data,
						// data: data.slice(0, 5),
						isLoading: !this.state.isLoading,
					});
				}, 2000);
			})
			.catch((err) => console.log(err));
	}

	handleNext = () => {
		const { index, data } = this.state;
		if (index < data.length - 1) {
			this.setState({ index: this.state.index + 1 });
		}
	};
	handlePrevious = () => {
		const { index, data } = this.state;
		if (index > 0 && index < data.length - 1) {
			this.setState({ index: this.state.index - 1 });
		}
	};
	render() {
		const { isLoading, data, index } = this.state;
		const content = isLoading ? (
			<>
				<p id="quote">
					<i>"{data[index].text}"</i>
				</p>
				<p id="author">{data[index].author}</p>
			</>
		) : (
			<i className="fa fa-spinner fa-spin" style={{ fontSize: "48px" }}></i>
		);
		return (
			<div className="App">
				<div className="container">
					{content}
					<div className="btns">
						<button onClick={this.handlePrevious}>Previous Quote</button>
						<button onClick={this.handleNext}>Next Quote</button>
						{isLoading ? (
							<p>
								{index + 1} / {data.length}
							</p>
						) : (
							""
						)}
						<button className="icons">
							<a href="https://twitter.com/">
								<i className="fa fa-twitter"></i>
							</a>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
