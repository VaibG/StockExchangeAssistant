import React, { Component } from 'react'

class MoverTable extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         tableData: [
         ]
      }
      this.getSymbols()
   }

   getSymbols() {
      const self = this
      var xhttp = new XMLHttpRequest();
      const url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers?region=US&lang=en";
      xhttp.open("GET", url, true);
      xhttp.setRequestHeader("X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com");
      xhttp.setRequestHeader("X-RapidAPI-Key", "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9");
      xhttp.send();

      xhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
               var res = JSON.parse(this.responseText)
            if (res['finance']['result'] != false) {
                  var dataSymbols = res['finance']['result'][self.props.id]['quotes']
                  var symbols = ""
               for (var i = 0; i < dataSymbols.length; i++) {
                  symbols += dataSymbols[i]['symbol'] + "%2C"
               }
               self.getTableData(symbols)
            } else {
               alert("Something went wrong, check your internet connection and try again")
            }
         }
      };
   }

    getTableData(symbols) {
      const self = this
      var xhttp = new XMLHttpRequest();
      const url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=" + symbols;
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
               self.setState({tableData: arr});
            } else {
               alert("Something went wrong, check your internet connection and try again")
            }
         }
      };

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


   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
         <div>
            <h1>{this.props.title}</h1>
            <table id='tableData'>
               <thead>
                  {this.renderTableHeader()}
               </thead>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}

export default MoverTable