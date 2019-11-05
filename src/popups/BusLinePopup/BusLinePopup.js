import React from 'react';
import PropTypes from 'prop-types';
import Feature from 'ol/Feature';

import './BusLinePopup.scss';

const propTypes = {
  feature: PropTypes.instanceOf(Feature).isRequired,
};

const BusLinePopup = ({ feature }) => {
  const props = feature.getProperties();
  return (
    <div className="wkp-bus-line-popup">
      {Object.entries(props).map(([key, value]) => {
        if (!/line/.test(key)) {
          return null;
        }
        return (
          <div key={key}>
            <div>{key}</div>
            <div>{value}</div>
          </div>
        );
      })}
    </div>
  );
};

BusLinePopup.propTypes = propTypes;

export default React.memo(BusLinePopup);