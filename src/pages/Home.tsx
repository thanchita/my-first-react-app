import usePosts from '../hooks/usePosts'
import Post from '../components/Post'
import classes from './Home.module.css'
const Home = () => {
  const { posts, isLoading } = usePosts()
  if (isLoading) return <h1>Loading...</h1>
  return (
    <div className={classes.feedContainer}>
      <h2>Feed</h2>
      {posts &&
        posts.map((post) => {
          return <Post key={post.id} post={post} />
        })}
    </div>
  )
}
export default Home
