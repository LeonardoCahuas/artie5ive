"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import moments from '../../public/fivemoments.svg'
import Image from 'next/image'

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
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlay = () => {
        setIsPlaying(true)
    }

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

                {!isPlaying && !isSmall && <div className="absolute bottom-0 left-0 right-0 px-4 py-1 text-white text-center bg-black bg-opacity-50">
                    <h3 className="text-lg w-full text-left">{isSmall ? video.title.slice(12) : video.title}</h3> {/* Ripristina il titolo */}
                </div>}
            </div>
            {isSmall && <div className="text-white text-center">
                <h3 className="text-lg w-full text-left">{isSmall ? video.title.slice(12) : video.title}</h3> {/* Ripristina il titolo */}
            </div>}
        </div>
    )
}

