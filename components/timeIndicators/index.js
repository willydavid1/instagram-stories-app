import React from 'react'
import { ProgressBar } from 'components/timeIndicators/progressBar'

const TimeIndicators = ({ auto, percentages, stories }) => {
  return (
    <div className="wrapper">
      {stories.map((_, i) => <ProgressBar key={i} percentage={percentages[i]} />)}
      <style jsx>{`
        .wrapper {
          position: absolute;
          display: flex;
          height: auto;
          width: 100%;
          padding: 10px;
          opacity: ${auto ? 1 : 0};
          transition: .5s;
        }
      `}</style>
    </div>
  )
}

export default TimeIndicators
