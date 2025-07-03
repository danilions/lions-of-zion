import React from 'react';
import WorldNetworkMap from './WorldNetworkMap';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <WorldNetworkMap 
        nodes={[]} 
        connections={[]} 
        width={800}
        height={400}
      />
    </div>
  );
};

export default Dashboard;