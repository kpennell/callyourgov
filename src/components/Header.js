import React from 'react';
import { Link } from 'react-router';

function Header() {
  return (
    <div className="Header clearfix">
      <div className="col-xs-12 col-sm-6">
        <h2><Link to="/">Call Your Gov</Link></h2>
      </div>
      <div className="hidden-xs col-sm-6">
        <div className="pull-right">
    
        </div>
      </div>
    </div>
  );
}

export default Header;
