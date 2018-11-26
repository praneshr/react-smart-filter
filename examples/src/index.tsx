import { injectGlobal } from 'emotion'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import ReactSmartFilter from '../../lib'

export interface ReactSmartFilterExamplesProps {
}

injectGlobal`
html,
body {
  padding: 0;
  margin: 0;
}
`
const config = {
  createdBy: {
    label: 'Created By',
    description: 'Filter by email',
    options: [
      {
        value: 'praneshr@indix.com',
        label: 'Pranesh Ravi',
      },
      {
        value: 'pranesh@indix.com',
        label: 'Pranesh',
      },
      {
        value: 'xyz@indix.com',
        label: 'XYZ',
      },
      {
        value: 'bot@indix.com',
        label: 'Bot',
      },
    ]
  },
  updatedBy: {
    label: 'Updated By',
    description: 'Filter by email',
    options: [
      {
        value: 'praneshr@indix.com',
        label: 'Pranesh Ravi',
      },
      {
        value: 'pranesh@indix.com',
        label: 'Pranesh',
      },
      {
        value: 'xyz@indix.com',
        label: 'XYZ',
      },
      {
        value: 'bot@indix.com',
        label: 'Bot',
      },
    ]
  },
  lastRunBy: {
    label: 'Last Run By',
    description: 'Filter by email',
    options: [
      {
        value: 'praneshr@indix.com',
        label: 'Pranesh Ravi',
      },
      {
        value: 'pranesh@indix.com',
        label: 'Pranesh',
      },
      {
        value: 'xyz@indix.com',
        label: 'XYZ',
      },
      {
        value: 'bot@indix.com',
        label: 'Bot',
      },
    ]
  },
}

export default class ReactSmartFilterExamples extends React.Component<ReactSmartFilterExamplesProps, any> {
  public render() {
    return (
      <div style={{ padding: 30 }}>
        <ReactSmartFilter
          options={config}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <ReactSmartFilterExamples />,
  document.getElementById('app'),
)
