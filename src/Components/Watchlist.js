import React from 'react';
import ls from 'local-storage'


class Watchlist extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            symbols: "",
            tableData:[],
            value: ""
        };
    }

    componentDidMount() {
        this.setState({symbols: ls.get('symbols')} || "")
        this.getTableData()
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.symbols !== this.state.symbols) {
        this.getTableData()
      }
    }



    getTableData() {
      const self = this
      if (this.state.symbols !== "") {
        var xhttp = new XMLHttpRequest();
        const url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=" + this.state.symbols;
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com");
        xhttp.setRequestHeader("X-RapidAPI-Key", "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9");
        xhttp.send();
      

          xhttp.onreadystatechange = function() {
             if (this.readyState === 4 && this.status === 200) {
                   var res = JSON.parse(this.responseText)
                if (res['quoteResponse']['result'] != false) {
                   var dataSets = res['quoteResponse']['result']
                   var arr = []
                   for (var i = 0; i < dataSets.length; i++) {
                      var jsonData = {};
                      jsonData['symbol'] = dataSets[i]['symbol']
                      jsonData['shortName'] = dataSets[i]['shortName']
                      jsonData['regularMarketPrice'] = Math.round((dataSets[i]['regularMarketPrice'] + 0.00001) * 100) / 100
                      jsonData['regularMarketChange'] = Math.round((dataSets[i]['regularMarketChange'] + 0.00001) * 100) / 100
                      jsonData['regularMarketChangePercent'] = Math.round((dataSets[i]['regularMarketChangePercent'] + 0.00001) * 100) / 100
                      if (jsonData['regularMarketChange'] > 0) {
                        jsonData['status'] = 'positive'
                      } else {
                        jsonData['status'] = 'negative'
                      }
                      arr.push(jsonData)
                   }
                   self.setState({tableData: arr, value:""});
                } else {
                   alert("Something went wrong, check your internet connection and try again")
                }
             }
          };
      }

    }

    handleChange = (event) => {
        this.setState({value: event.target.value.toUpperCase()});
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const newSym = this.state.symbols + e.target.value + "%2C"
            this.setState({symbols: newSym})
            ls.set('symbols', newSym);
        }
    }


    renderTableData() {
      return this.state.tableData.map((tableData, index) => {
         const { symbol, shortName, regularMarketPrice, regularMarketChange, regularMarketChangePercent, status } = tableData //destructuring
         return (
            <tr key={symbol}>
               <td>{symbol}</td>
               <td>{shortName}</td>
               <td>{regularMarketPrice}</td>
               <td className={status}>{regularMarketChange}</td>
               <td className={status}>{regularMarketChangePercent}</td>
            </tr>
         )
      })
   }

   renderTableHeader() {
         return (
            <tr>
               <th>Symbol</th>
               <th>Name</th>
               <th>Price</th>
               <th>Change</th>
               <th>% Change</th>
            </tr>
         )
   }

   renderEntryRow() {
    return (
        <tr>
            <td>
            <input type="text" placeholder="Add Ticker..." value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        )
   }

    render() {
    return (
      <section id="watchlist">
      <h1>Watchlist</h1>

      <div>
            <h1>{this.props.title}</h1>
            <table id='tableData'>
               <thead>
                  {this.renderTableHeader()}
               </thead>
               <tbody>
                  {this.renderTableData()}
                  {this.renderEntryRow()}
               </tbody>
            </table>
         </div>

      </section>
    );
    }
}
export default Watchlist