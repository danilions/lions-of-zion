export default function ShowcaseLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="showcase-layout">
      {children}
    </div>
  );
}
