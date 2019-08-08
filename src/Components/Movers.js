import React from 'react';
import MoverTable from './MoverTable.js'

class Movers extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
    return (
      <section id="movers">
        <MoverTable id={0} title={"Top Gainers"} />
        <MoverTable id={1} title={"Top Losers"} />
        <MoverTable id={2} title={"Highest Volume Traded"} />

        </section>
    );
    }
}
export default Movers