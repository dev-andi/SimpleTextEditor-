import React from 'react';
import ReactDOM from 'react-dom';
import MyEditApp from './editorCode';
import { Grid, Alert } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <Grid>
        <h1 className="text-muted"><center>TextEditor</center></h1>
        <Alert>
          <ul>Things you can do:</ul>
          <li>Drag and Drop text (.txt) files</li>
          <li>URL- links will be automatically detected</li>
          <li>Auto spellCheck available </li>
          <li>Line Counter </li>
          <li>And of-course , type-in anything</li>
        </Alert>
        <p> </p>
        <MyEditApp/>
        <p> </p>
      </Grid>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById( 'app' ));
