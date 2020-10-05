/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

type PropTypes = {
  urlVideo: string
  width: string
}

// Example video links
// https://player.vimeo.com/video/177865076
// https://www.youtube.com/embed/-5KAN9_CzSA
const VideoPlayer: React.FC<PropTypes> = ({ urlVideo, width }: PropTypes) => {
  const [player, setPlayer] = useState<string>('')
  const [video, setVideo] = useState<string>('')

  useEffect(() => {
    const idVideo = urlVideo.split('/').pop()

    if (urlVideo.includes('vimeo.com')) {
      setPlayer('vimeo')
      setVideo(`https://player.vimeo.com/video/${idVideo}`)
    } else if (urlVideo.includes('youtube.com')) {
      setPlayer('youtube')
      setVideo(`https://www.youtube.com/embed/${idVideo?.split('?v=').pop()}`)
    }
  }, [urlVideo])

  return player === 'vimeo' ? (
    <iframe
      title="Vimeo"
      src={video}
      width={width}
      height="360"
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
    />
  ) : (
    <iframe
      title="Youtube"
      width={width}
      height="360"
      src={video}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}

export default VideoPlayer
