
interface ScrollSectionProps {
  backgroundImage: string;
  className?: string;
  children: React.ReactNode;
  backgroundClass: string
}

export function ScrollSection({ backgroundImage, className, children, backgroundClass }: ScrollSectionProps) {
  return (
    <div className="relative w-full h-full">
      {/* Background image with fixed positioning */}
      <div 
        className={`absolute inset-0 w-full h-full  ${backgroundClass}`}
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

