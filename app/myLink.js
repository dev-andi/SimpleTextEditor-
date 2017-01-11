import React from 'react';

const myLink = (props) => (
  <button onClick={() => console.log(props.href)}>{props.children}</button>
);

export default myLink;
