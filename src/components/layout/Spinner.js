import React from 'react';
//import spinner from './spinner.gif';
import '../../css/layoutCss/spinner.css';

export default () => {
  return (
    <div className="loader" style={{ margin: 'auto', display: 'block' }}>
      {/* <img
        src={spinner}
        alt="Loading..."
        style={{ width: '100px', margin: 'auto', display: 'block' }}
      /> */}
    </div>
  );
};
