import './App.css'
import Greeting from './components/Greeting'
import Navbar from './components/Navbar'
import { PostDTO } from './types/dto'
import Post from './components/Post'
import { FormEvent, useState } from 'react'

const initialPosts: PostDTO[] = [
  {
    id: 1,
    userId: 1,
    title: "Let's learn React!",
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    id: 2,
    userId: 2,
    title: 'How to install Node.js',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    id: 3,
    userId: 3,
    title: 'Basic HTML',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
]

function App() {
  const [posts, setPosts] = useState<PostDTO[]>(initialPosts)
  const [newTitle, setNewTitle] = useState<string>('')
  const [newBody, setNewBody] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const currentPosts = [...posts]

    currentPosts.push({
      id: Math.floor(Math.random() * 1000), // * database should generate id for us
      userId: Math.floor(Math.random() * 1000),
      title: newTitle,
      body: newBody,
    })

    setPosts(currentPosts)

    // Clear form after set posts
    setNewBody('')
    setNewTitle('')
  }

  return (
    <div className="App">
      <Navbar />
      <Greeting name="PomPam" isLoggedIn={true} />

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
        <label>Body</label>
        <input type="text" value={newBody} onChange={(e) => setNewBody(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>

      <div className="feed-container">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />
        })}
      </div>
    </div>
  )
}

export default App
