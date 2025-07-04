import React from 'react';
import WorldNetworkMap from './WorldNetworkMap';

const NetworkDisplay: React.FC = () => {
  return (
    <div className="network-display">
      <WorldNetworkMap
        showNodes={true}
        showConnections={true}
      />
    </div>
  );
};

export default NetworkDisplay;