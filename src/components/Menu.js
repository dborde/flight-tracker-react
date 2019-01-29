import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Links</h1>
        <div className="page-header__actions">
          <Link className="button" to="/flight">Flight Tracker</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(Menu);
