"use client"


interface Video {
    id: string
    title: string
    videoId: string
}

interface VideoCardProps {
    video: Video
    isSmall: boolean
}

export function VideoCard({ video, isSmall }: VideoCardProps) {

    return (
        <div>
            <div className="aspect-video rounded-xl overflow-hidden relative bg-white">

                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
           <div className="text-white text-center">
                <h3 className="text-lg w-full text-left">{isSmall ? video.title.slice(12) : video.title}</h3> {/* Ripristina il titolo */}
            </div>
        </div>
    )
}

