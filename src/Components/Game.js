import React from 'react';

class Game extends React.Component {
	
	constructor(props) {
    super(props);
    this.state = {seconds: 20, balance: 1000, month: "", year: "", from: 0, to: 0};
    }
    
    tick() {
    	this.setState(prevState => ({
    		seconds: prevState.seconds - 1
    	}));
    	
    	if (this.state.seconds === 0) {
    		this.updateBalance()
    		this.calculateDate()
    		this.setState({
    			seconds: 20
    		});
    	}
    }

    calculateDate() {
    	var randDate = this.randomDate(new Date(2012, 0, 1), new Date())
    	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    	const month = months[randDate.getMonth()] 
    	const year = randDate.getFullYear()
    	this.setState({month: month, year: year})
    	this.generateEpochTimes(randDate)
    }

    updateBalance() {
    	const fromTime = this.state.from
    	const toTime = this.state.to
    	const self = this
    	var xhttp = new XMLHttpRequest();
    	xhttp.onreadystatechange = function() {
    		if (this.readyState === 4 && this.status === 200) {
    			var res = JSON.parse(this.responseText)
    			if (!res['chart']['error']) {
    				var openPrices = res['chart']['result'][0]["indicators"]["quote"][0]["open"]
    				const startPrice = (res['chart']['result'][0]["indicators"]["quote"][0]["open"][0]);
    				const endPrice = (openPrices[openPrices.length-1]);
    				// alert("Start Price = " + startPrice + " End Price = " + endPrice)
    				var newBalance = ((endPrice - startPrice)/startPrice) * self.state.balance + self.state.balance
    				newBalance = Math.round(newBalance * 100) / 100
    				self.setState({balance: newBalance})
    			}
    		}
    	};
    	const url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-histories?region=US&lang=en&symbol=MGI&from=" + fromTime + "&to=" + toTime + "&events=div&interval=1d";
    	xhttp.open("GET", url, true);
    	xhttp.setRequestHeader("X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com");
    	xhttp.setRequestHeader("X-RapidAPI-Key", "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9");
    	xhttp.send();
    }

    generateEpochTimes(date) {
    	const start = new Date(date.getFullYear(), date.getMonth(), 1, 14)
    	if (date.month === 11) {
    		var end = new Date(date.getFullYear() + 1, 0, 1, 14)
    	} else {
    		end = new Date(date.getFullYear(), date.getMonth() + 1, 1, 14)
    	}
    	var st = start.getTime()/1000
    	var nd = end.getTime()/1000

    	this.setState({from: st, to: nd})

    }

    randomDate(start, end) {
    	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }



	componentDidMount() {
		this.calculateDate()
		this.interval = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
	return (
		<div>
		Seconds: {this.state.seconds}
		<h1>
		Date: {this.state.month} {this.state.year}
		</h1>
		<h2>		
		Start Time: {this.state.from}
		<br/>
		End Time: {this.state.to}</h2>
		<br/>
		<h3>Balance: ${this.state.balance}</h3>
		</div>
    );
    }
}
export default Game
