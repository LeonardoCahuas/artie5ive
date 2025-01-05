interface ScrollSectionProps {
  backgroundImage: string;
  className?: string;
  children: React.ReactNode;
}

export function ScrollSection({ backgroundImage, className, children }: ScrollSectionProps) {
  return (
    <div className="relative w-full h-full">
      {/* Background image with fixed positioning */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed', // This makes the background stay fixed while scrolling
        }}
      />
      
      {/* Overlay and content */}
      <div className={`relative h-full ${className}`}>
        {children}
      </div>
    </div>
  )
}

