import './App.css'
import Greeting from './components/Greeting'
import Navbar from './components/Navbar'
import { CreatePostDTO, PostDTO } from './types/dto'
import Post from './components/Post'
import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [posts, setPosts] = useState<PostDTO[] | null>(null)
  const [newTitle, setNewTitle] = useState<string>('')
  const [newBody, setNewBody] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPending, setIsPending] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        // const data = await res.json()

        // if (!res.ok) {
        //   throw new Error('error')
        // }

        const res = await axios.get<PostDTO[]>('https://jsonplaceholder.typicode.com/posts')

        setPosts(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsPending(true)

    // if (!posts) return

    const data: CreatePostDTO = {
      title: newTitle,
      body: newBody,
      userId: Math.floor(Math.random() * 1000),
    }

    try {
      const response = await axios.post<PostDTO>('https://jsonplaceholder.typicode.com/posts', data, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      console.log(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsPending(false)
    }

    // const currentPosts = [...posts]

    // currentPosts.push({
    //   id: Math.floor(Math.random() * 1000), // * database should generate id for us
    //   userId: Math.floor(Math.random() * 1000),
    //   title: newTitle,
    //   body: newBody,
    // })

    // setPosts(currentPosts)

    // Clear form after set posts
    setNewBody('')
    setNewTitle('')
  }
  if (isLoading) return <h1>Loading...</h1>
  return (
    <div className="App">
      <Navbar />
      <Greeting name="PomPam" isLoggedIn={true} />

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
        <label>Body</label>
        <input type="text" value={newBody} onChange={(e) => setNewBody(e.target.value)} required />
        {isPending ? <button disabled>Pending</button> : <button type="submit">Submit</button>}
      </form>

      <div className="feed-container">
        {posts &&
          posts.map((post) => {
            return <Post key={post.id} post={post} />
          })}
      </div>
    </div>
  )
}

export default App
