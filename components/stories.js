import React, { useEffect, useState } from 'react'
import TimeIndicators from 'components/timeIndicators'

export const Stories = ({ defaultInterval, storiesValues, width, height }) => {
  const [counter, setCounter] = useState(0)
  const [auto, setAuto] = useState(true)
  const [percentages, setPercentages] = useState([])

  useEffect(
    () => {
      if (!auto || counter >= storiesValues.length - 1) return
      const interval = setInterval(_ => {
        setCounter(counter + 1)
      }, defaultInterval)
      return _ => {
        clearInterval(interval)
      }
    }, [counter, auto])

  useEffect(
    () => {
      let interval
      let progressBar = 1
      if (!auto) return
      interval = setInterval(frame, defaultInterval / 100)
      function frame() {
        if (progressBar >= 100) {
          clearInterval(interval)
        } else {
          progressBar++
          let percentages2 = [...percentages.slice(0, counter).map(_ => 100)]
          percentages2[counter] = progressBar
          setPercentages(percentages2)
        }
      }
      return _ => {
        clearInterval(interval)
      }
    }, [counter, auto])

  const moveBack = () => {
    setCounter(counter > 0 ? counter - 1 : counter)
  }

  const moveForward = () => {
    setCounter(counter !== storiesValues.length - 1 ? counter + 1 : counter)
  }

  const moveStory = (e, side) => {
    e.stopPropagation()
    if (side === 'left') moveBack()
    else if (side === 'right') moveForward()
  }

  const toggleStory = (e, value) => {
    e.stopPropagation()
    setAuto(value || !auto)
  }

  return (
    <div className="wrapper">
      <div className="viewport">
        <TimeIndicators
          stories={storiesValues}
          {...{ percentages, auto }}
        />
        {
          storiesValues.map((story, i) => {
            if (i === counter) {
              return <img className="media" src={story.url} key={i} />
            }
          })
        }
        <div className="controls">
          <button className="pauseButton" onClick={toggleStory}>
            {
              auto 
                ? 'STOP'
                : 'PLAY'
            }
          </button>
          <div 
            onMouseUp={(e) => toggleStory(e, true)}
            onMouseDown={(e) => moveStory(e, 'left')}
            onTouchEnd={(e) => toggleStory(e, true)}
          />
          <div
            onMouseUp={(e) => toggleStory(e, true)}
            onMouseDown={(e) => moveStory(e, 'right')}
            onTouchEnd={(e) => toggleStory(e, true)}
          />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer */
          -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
          -webkit-user-select: none; /* Chrome, Safari, and Opera */
          -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
        }
        .viewport {
          width: ${width};
          height: ${height};
          background: black;
        }
        .controls {
          top: 0;
          display: grid;
          grid-template-columns: repeat(2,1fr);
          height: 100%;
          position: absolute;
          width: 100%;
        }
        .pauseButton {
          background-color: transparent;
          border: 1px solid #ffffff;
          border-radius: 4px;
          color: white;
          padding: 6px 16px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
          position: absolute;
          bottom: 10px;
          right: 10px;
          outline: none;
          transition: 0.3s;
          opacity: ${auto ? 1 : .25}
        }
        .pauseButton:hover {
          background-color: #e7e7e7; 
          color: black;
          opacity: 1
        }
        .media {
          width: 100%;
          height: 100%;
          object-fit: cover; 
        }
      `}</style>
    </div>
  )
}

Stories.defaultProps = {
  width: '360px',
  height: '90vh',
  defaultInterval: 4000
}
