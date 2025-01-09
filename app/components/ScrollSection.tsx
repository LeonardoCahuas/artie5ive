'use client'

interface ScrollSectionProps {
  backgroundImage: string;
  className?: string;
  children: React.ReactNode;
  backgroundClass?: string;
}

export function ScrollSection({ backgroundImage, className = "", children, backgroundClass = "" }: ScrollSectionProps) {
  return (
    <div className="relative w-full h-full">
      {/* Background image with conditional fixed positioning */}
      <div 
        className={`parallax-bg ${backgroundClass}`}
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />
      
      {/* Overlay and content */}
      <div className={`relative h-full ${className}`}>
        {children}
      </div>
    </div>
  )
}

