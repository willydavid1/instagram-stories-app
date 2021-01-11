import { useState, useRef } from 'react'
import { Stories } from '../components/stories'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [valueURL, setValueURL] = useState('')
  const [intervalMedia, setIntervalMedia] = useState(4)
  const [storiesURLS, setStoriesURLS] = useState([
    {
      url: 'https://cdn.pixabay.com/photo/2018/11/11/19/46/christmas-3809544_960_720.jpg',
    },
    {
      url: 'https://cdn.pixabay.com/photo/2020/12/28/22/48/buddha-5868759_960_720.jpg',
    },
    {
      url: 'https://cdn.pixabay.com/photo/2020/10/26/05/32/mountains-5686361_960_720.jpg',
    },
    {
      url: 'https://cdn.pixabay.com/photo/2019/10/15/13/33/red-deer-4551678_960_720.jpg',
    }
  ])
  let inputRef = useRef()
  const handleSaveURL = (e) => {
    e.preventDefault()
    setStoriesURLS([...storiesURLS, { url: valueURL }])
    setValueURL('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.container}>
      <Stories
        storiesValues={storiesURLS}
        defaultInterval={intervalMedia * 1000}
      />
      <div className={styles.wrapperDescription}>
        <h1>Welcome to instagram stories</h1>
        <form onSubmit={handleSaveURL}>
          <div className={styles.input}>
            <input ref={inputRef} type="text" className={styles.inputText} placeholder="Url of your image" onChange={(e) => setValueURL(e.target.value)} value={valueURL} />
            <input type="number" className={styles.numberText} placeholder="time interval per image - seconds" onChange={(e) => e.target.value > 0 ? setIntervalMedia(e.target.value) : null} value={intervalMedia} />
          </div>
          <button className={styles.button} disabled={valueURL.length <= 0} type="submit" >
            SAVE
          </button>
        </form>
        {
          storiesURLS.length > 0 && (
            <div className={styles.wrapperURLs}>
              <ol>
                {
                  storiesURLS.map((elem) => (
                    <li className={styles.li} title={elem.url}>
                      <p className={styles.text}>
                        {elem.url}
                      </p>
                      <button className={styles.deleteURL} onClick={(e) => {
                        e.preventDefault()
                        const newData = storiesURLS.filter(({url}) => url !== elem.url)
                        setStoriesURLS(newData)
                      }}>
                        DELETE URL
                      </button>
                    </li>
                  ))
                }
              </ol>
              
            </div>
          )
        }
      </div>
    </div>
  )
}
