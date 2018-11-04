import * as React from 'react'
import * as ReactDOM from 'react-dom'

import ReactSmartFilter from '../../lib'

export interface ReactSmartFilterExamplesProps {
}

export default class ReactSmartFilterExamples extends React.Component<ReactSmartFilterExamplesProps, any> {
  public render() {
    return (
      <div>
        <ReactSmartFilter />
      </div>
    );
  }
}

ReactDOM.render(
  <ReactSmartFilterExamples />,
  document.getElementById('app'),
)
