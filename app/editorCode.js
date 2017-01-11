//React and Bootstrap Imports
import React from 'react';
import { Well, Panel } from 'react-bootstrap';
import Linkify from 'react-linkify';
import myLink from './myLink';

//import DropzoneComponent from 'react-dropzone-component';

//Draftjs for Editor
import Draft from 'draft-js';
const { EditorState, ContentState } = Draft;
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import Editor from 'draft-js-plugins-editor'; // important, to use plugins

import ToolTip from 'react-portal-tooltip'; //for tips

//Plugins Imported

// To use emojis, for extra info check the alert box during execution...
import createEmojiPlugin from 'draft-js-emoji-plugin';
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;


//BreakOut of the block ..
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
const blockBreakoutPlugin = createBlockBreakoutPlugin();

//for detecting links(hyperlinks) within the editor , automatically...
import createLinkifyPlugin from 'draft-js-linkify-plugin';
const linkifyPlugin = createLinkifyPlugin({
    component: myLink,
  });

// for Toolbar buttons..
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';//for buttons
const richButtonsPlugin = createRichButtonsPlugin();
const {
  // inline buttons
  ItalicButton, BoldButton, MonospaceButton, UnderlineButton, BlockquoteButton,LinkButton,
  // block buttons
  ParagraphButton, H1Button, H2Button, H3Button, H4Button,  ULButton, OLButton
} = richButtonsPlugin;


//import CodeUtils from 'draft-js-code' ;
//const CodeBlock = CodeUtils()

//upload .txt files, will modify later to add other types too...
import createDndFileUploadPlugin from 'draft-js-dnd-plugin';
const dndFileUploadPlugin = createDndFileUploadPlugin();


//plugins array
const plugins = [
  blockBreakoutPlugin,
  richButtonsPlugin,
  emojiPlugin,
  dndFileUploadPlugin,
  linkifyPlugin
];

//Class Code Begins..
export default class MyEditApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: this._getPlaceholder(),
    isTooltipActive: false}; //didn't used Editor.createEmpty() ..
  }
    showTooltip() {
        this.setState({isTooltipActive: true})
    }
    hideTooltip() {
        this.setState({isTooltipActive: false})
    }

  /*this.state = {
    editorState: this._getPlaceholder()
  }*/

  //Code for pre-written text. and content state
  _getPlaceholder() {
    const placeholder = '';     //write something here, if you want to have pre-laoded text on screen..
    const contentHTML = DraftPasteProcessor.processHTML(placeholder);
    const state = ContentState.createFromBlockArray(contentHTML);
    return Draft.EditorState.createWithContent(state);
  }

  //For changing state of the editor..
  _onChange(editorState) {
    this.setState({editorState});
  }

  //Packing items together in Render ...
  render() {
    let { editorState } = this.state;

    //line counter..
    const currentBlockKey = editorState.getSelection().getStartKey()
  	const currentBlockIndex = editorState.getCurrentContent().getBlockMap()
    	.keySeq().findIndex(k => k === currentBlockKey)

    return (
      <div>
        <Well style={{ marginBottom:0 }}>
          <BoldButton/>
          <ItalicButton/>
          <UnderlineButton/>
          <MonospaceButton/>
          <BlockquoteButton/>
          <b> | &nbsp; </b>
          <ParagraphButton/>
          <H1Button/>
          <H2Button/>
          <H3Button/>
          <H4Button/>
          <ULButton/>
          <OLButton/>
        </Well>
        <Panel>
          <div>
            Current line number: {currentBlockIndex + 1}
            <hr />
              <div>
                    <p id="text" onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}>Tip</p>
                    <ToolTip active={this.state.isTooltipActive} position="top" arrow="center" parent="#text">
                        <div>
                            <p>To start, type in below</p>
                            <img src="image.png"/>
                        </div>
                    </ToolTip>
                </div>
            <Editor
              editorState={editorState}
              onChange={this._onChange.bind(this)}
              placeholder  = {this._getPlaceholder.bind(this)}
              spellCheck={true}
              plugins={plugins}
            />
          <div><EmojiSuggestions /></div>
          </div>
        </Panel>
      </div>
    );
  }
}
