import React from "react"

export const fixedFullscreen = (): React.CSSProperties => ({
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 1000,
})

export const fixedBottomRight = (options = { bottom: 0, right: 0, pointerEvents: false }): React.CSSProperties => ({
    position: 'fixed',
    bottom: options.bottom,
    right: options.right,
    pointerEvents: options.pointerEvents ? undefined : 'none',
    zIndex: 1000,
})