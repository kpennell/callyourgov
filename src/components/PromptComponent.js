import React from 'react';
import { browserHistory } from 'react-router';
import '../Loader.css';

class PromptComponent extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      location: undefined,
    };
  }

  componentDidMount() {
    // console.dir(this.props.location.query.prompt)
    // console.log(this)
  }

  render() {
    return (
      <div id="location" className="text-center">
        <p>Call them and Say</p>
        <p>Hi, my name is _____ and I'm a constituent from [CITY, ZIP].</p>
        <p>I am calling to express my deep opposition to {this.props.prompt}</p>
      </div>
    );
  }
}

PromptComponent.propTypes = {
  params: React.PropTypes.object,
  routeParams: React.PropTypes.object,
};

export default PromptComponent;
