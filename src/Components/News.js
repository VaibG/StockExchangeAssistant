import React from 'react';
import NewsFeed from './NewsFeed.js'

class News extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {category: "generalnews", value: ""};
    }

    handleChange = (event) => {
        this.setState({value: event.target.value.toUpperCase()});
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.setState({category: e.target.value})
            console.log(this.state.category)
        }
    }

    render() {
    return (
      <section id="news">
      <input type="text" placeholder="Search..." value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
      <NewsFeed category = {this.state.category}/>
      </section>
    );
    }
}
export default News