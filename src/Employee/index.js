import React from 'react'
import EnterProducts from './components/EnterProducts/';
import Orders from './components/Orders/';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

function Employee() {
 
  return (
    <div className="wrapper clear">
<Tabs>
    <TabList>
      <Tab>Enter Products</Tab>
      <Tab>Orders</Tab>
    </TabList>

    <TabPanel>
      <EnterProducts/>
    </TabPanel>
    <TabPanel>
      <Orders/>
    </TabPanel>
  </Tabs>        
    </div>
  );
}

export default Employee;
