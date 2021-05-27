import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import LayoutFlow from '@theme/Reactflow';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import  { Redirect } from 'react-router-dom';

import ReactFlow from 'react-flow-renderer';


const markdown = `# Personalisation Engine

## Design
### Architecture
#### Today
#### Future
#### Tasks
## Developemnt
### API - PER-20
#### Today
#### Future
#### Tasks
### Data Engineering - PER-64
#### Today
#### Future
#### Tasks
### Infrastructure
#### Today
#### Future
#### Tasks
### Signal Development - PER-19
#### Today
#### Future
#### Tasks
### Development Practices - PER-106
#### Today
#### Future
#### Tasks
### Real-time Data Collection - PER-1
#### Today
#### Future
#### Tasks
##### A
##### B
## Maintiance
### Dashboards and Alerts - PER-103
#### Today
#### Future
#### Tasks
### Visibility and Metrics - PER-102
#### Today
#### Future
#### Tasks
## Governence
### Security - PER-104
#### Today
#### Future
#### Tasks
### Finances - PER-105
#### Today
#### Future
#### Tasks
## Community of Practice
### Today
### Future
### Tasks
`

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description=">">
      <LayoutFlow markdown={markdown} />
    </Layout>
  );
}

export default Home;
