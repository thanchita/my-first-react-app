import usePosts from '../hooks/usePosts'
import classes from './Home.module.css'
import Post from '../components/Post'
import { useAuth } from '../providers/AuthProvider'

const Home = () => {
  const { posts, isLoading } = usePosts()
  const { isLoggedIn } = useAuth()

  console.log(isLoggedIn)

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className={classes.container}>
      <div className={classes.feedContainer}>
        <h2>Feed</h2>
        {posts &&
          posts.map((post) => {
            return <Post key={post.id} post={post} />
          })}
      </div>
    </div>
  )
}

export default Home
