import React from 'react';
import WorldNetworkMap from './WorldNetworkMap';

const NetworkDisplay: React.FC = () => {
  return (
    <div className="network-display">
      <WorldNetworkMap 
        nodes={[]} 
        connections={[]} 
      />
    </div>
  );
};

export default NetworkDisplay;