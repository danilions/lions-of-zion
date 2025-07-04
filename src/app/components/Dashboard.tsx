import React from 'react';
import WorldNetworkMap from './WorldNetworkMap';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <WorldNetworkMap
        showNodes={true}
        showConnections={true}
        animateConnections={true}
      />
    </div>
  );
};

export default Dashboard;