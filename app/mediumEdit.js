// to use this one, replce app.js with mediumEdit.js in webpack config(entry)..

import React from 'react';
import ReactDOM from 'react-dom';

import {
  Editor,
  createEditorState,
} from 'medium-draft';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(), // for empty content
    };

    /*
    this.state = {
      editorState: createEditorState(data), // with content
    };
    */

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        ref="editor"
        editorState={editorState}
        onChange={this.onChange} />
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
