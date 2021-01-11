import React from 'react'

export const ProgressBar = ({ height, width, bgcolor, percentage }) => {
  return (
    <div className="wrapperProgressBar">
      <div className="fillerProgressBar" />
      <style jsx>{`
        .wrapperProgressBar {
          height: ${height};
          width: ${width};
          background: rgba(255,255,255,.55);
          border-radius: 5px;
          margin: 0 2px;
        }
        .fillerProgressBar {
          height: inherit;
          max-width: 100%;
          width: ${percentage}%;
          background: ${bgcolor};
          border-radius: inherit;
        }
      `}</style>
    </div>
  )
}

ProgressBar.defaultProps = {
  height: '3px',
  width: '100%',
  percentage: 0,
  bgcolor: '#ffffff'
}
