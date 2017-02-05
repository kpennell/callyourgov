import React from 'react';
import { browserHistory } from 'react-router';

class ZipFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      zip: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.zip.length) {
      const path = `/location/${this.state.zip}`;
      browserHistory.push(path);
    }
  }

  onChange(e) {
    this.setState({
      zip: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder=""
          onChange={this.onChange}
        />
        <button type="submit" className="btn btn-success">Find My Reps/Senators</button>
      </form>
    );
  }
}

export default ZipFormComponent;
