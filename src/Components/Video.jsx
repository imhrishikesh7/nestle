import React from 'react'

const Video = ({src}) => {
  return (
    <div>
        <video autoPlay muted loop 
          style={{width:"100%",
          scale: "1.2"
          }}
        >
            <source src={src} />
        </video>
    </div>
  )
}

export default Video