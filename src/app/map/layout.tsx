export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="map-layout" style={{ margin: 0, padding: 0, height: '100vh', width: '100vw' }}>
      {children}
    </div>
  );
}
