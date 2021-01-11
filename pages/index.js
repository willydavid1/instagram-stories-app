import { Stories } from '../components/stories'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Stories 
        storiesValues={[
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
        ]}
      />
    </div>
  )
}
