import React from 'react';
import { browserHistory } from 'react-router';
import '../Loader.css';
import Congress from '../services/SunlightFoundationCongressApi';
import PromptComponent from '../components/PromptComponent';

class RepsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: undefined,
    };
  }

  componentDidMount() {
    Congress.getLegislatorsByZip(this.props.params.zip).then((data) => {

      this.setState({
        location: data,
      });
    });
    // api.getData(this.props.params.zip).then((data) => {
    //   // console.log(data);
    //   // this.setState({
    //   //   location: data.list,
    //   // });
    // });
    // console.dir(this.props.location.query.prompt)
  }

  handleClick(e, index) {
    e.preventDefault();
    browserHistory.push({
      pathname: `/detail/${this.props.routeParams.zip}`,
      state: this.state.location[index],
    });
  }


  render() {
    if (!this.state.location) {
      return <div className="loader">Loading...</div>;
    }
    let promptFromUrl = this.props.location.query.prompt;

    const location = this.state.location.map((dailylocation, index) =>
      (
        <a
          href=""
          className="col-xs-6 col-sm-4 col-md-3 location-daily"
          key={dailylocation.bioguide_id}
          onClick={e => this.handleClick(e, index)}
        >
   
          <p>{dailylocation.first_name}</p>
          <p>{dailylocation.last_name}</p>
          <p>{dailylocation.phone}</p>
          
        </a>
      ));

    return (
      <div>
      <div id="location" className="text-center">
        <h1>ZipCode: {this.props.params.zip}</h1>
        <p>These are your local reps and senators</p>
        <div id="location-daily-container">
          {location}
        </div>
      </div>
      <div id="promptDiv" className="text-center">
       <PromptComponent prompt={promptFromUrl} />
      </div>
      </div>
      
    );
  }
}

RepsComponent.propTypes = {
  params: React.PropTypes.object,
  routeParams: React.PropTypes.object,
};

export default RepsComponent;
