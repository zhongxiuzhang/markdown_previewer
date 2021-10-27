import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import './index.css';

// const React = require('react')
// const ReactDOM = require('react-dom')
// const ReactMarkdown = require('react-markdown')

var input = '# This is a header\n\nAnd this is a paragraph';

input = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![JavaScript Logo](https://i.ibb.co/f1JXPVX/Java-Script.jpg)`;

// ReactDOM.render(<ReactMarkdown source={input} />, document.getElementById('container'))

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class MarkdownExample extends React.Component {
  constructor(props){
    super(props);
    this.getMarkdownText = this.getMarkdownText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      input: this.props.input
    }
  }
  handleChange(e){
  this.setState({input:e.target.value});
  }
  getMarkdownText(text) {
    var rawMarkup = marked(text,{ renderer: renderer, breaks:true});
    return { __html: rawMarkup };
  }
  render() {
    return (
      <html>
        <div id="input-section">
          <label id="input-label">Editor</label>
          <br/>
          <textarea id="editor" value={this.state.input} onChange={this.handleChange}>
          </textarea>
        </div>
        <div id="preview-section">
          <label id="preview-label">Previewer</label>
          <div id="preview" dangerouslySetInnerHTML={this.getMarkdownText(this.state.input)}></div>
        </div>
      </html>
      );
  }
}

ReactDOM.render(<MarkdownExample input={input}/>, document.getElementById('container'))