import React from "react";

const centerDiv = {
  'display': 'flex',
  'flex-direction': 'column',
  'justify-content': 'center',
  'align-items': 'center',
  'text-align': 'center',
  'height': '100vh'
};

const PageNotFound = () => (
  <div style={centerDiv}>
    <h1>Whoops</h1>
    <p>404: Requested page not found.</p>
  </div>
);

export default PageNotFound;
