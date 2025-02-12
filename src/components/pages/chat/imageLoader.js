import React, { useState, useEffect } from 'react'

const ImageLoader = ({ imageUrl, classes }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const img = new Image()
        img.src = imageUrl
        img.onload = () => setLoading(false)
    }, [imageUrl])

    return (
        <div className={classes} style={{ borderRadius: "inherit", position: 'relative' }}>
            {loading ? (
                <div
                    className="custom-skeleton"
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: 'inherit',
                        animation: 'pulse 1.5s infinite'
                    }}
                ></div>
            ) : (
                <img
                    src={imageUrl}
                    alt={""}
                    loading="lazy"
                    className={classes}
                    style={{ borderRadius: "inherit" }}
                />
            )}
        </div>
    )
}

export default ImageLoader
