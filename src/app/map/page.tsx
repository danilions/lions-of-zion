import WorldNetworkMap from '../../components/WorldNetworkMap';

export default function MapPage() {
  // If there's existing data fetching code, leave it intact
  // Otherwise add dummy props
  
  return (
    <div className="map-container">
      <WorldNetworkMap 
        nodes={[]} 
        connections={[]}
        width={1200}
        height={600}
      />
      
      {/* ...existing code... */}
    </div>
  );
}