interface ScrollSectionProps {
  backgroundImage: string;
  className?: string;
  children: React.ReactNode;
  backgroundClass?: string;
}

export function ScrollSection({ 
  backgroundImage, 
  className = "", 
  children, 
  backgroundClass = "" 
}: ScrollSectionProps) {
  return (
    <section className="scroll-section">
      <div 
        className={`scroll-section-bg ${backgroundClass}`}
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />
      <div className={`scroll-section-content ${className}`}>
        {children}
      </div>
    </section>
  )
}
