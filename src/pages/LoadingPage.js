// import React from 'react';

import '../cssfile/loadingpage.css';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loader">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

const LoadingDiv = () => {
  return (
    <div className="loading-div">
      <div className="loader loader-small">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export { LoadingPage, LoadingDiv };
