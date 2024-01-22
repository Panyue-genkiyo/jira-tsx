import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProviders } from './context';
import { loadServer, DevTools} from 'jira-dev-tool'
import 'antd/dist/antd.less'
import './App.css'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

loadServer(() =>
  root.render(
    <React.StrictMode>
      <AppProviders>
          <DevTools/>
          <App /> 
        </AppProviders>
    </React.StrictMode>,
  )
);