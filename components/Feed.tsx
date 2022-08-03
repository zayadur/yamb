import { useState } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import CreatePost from './CreatePost'
import { Post } from '../typings'
import PostComponent from '../components/Post'
import { fetchPosts } from '../utils/fetchPosts'

interface Props {
  posts: Post[]
}

function Feed({ posts: postsProp }: Props) {

  const [posts, setPosts] = useState<Post[]>(postsProp)

  const handleRefresh = async () => {
    const posts = await fetchPosts()
    setPosts(posts)
  }

  return (
    <div className='max-h-screen col-span-7 overflow-scroll lg:col-span-5 border-x scrollbar-hide'>
      <div className='flex items-center justify-between'>
        <h1 className='p-5 pb-0 text-xl font-bold'>Your Feed</h1>
        <RefreshIcon onClick={handleRefresh} className='w-8 h-8 mt-5 mr-5 transition-all duration-200 ease-out cursor-pointer hover:rotate-180 active:scale-125' />
      </div>

      <div>
        <CreatePost setPosts={setPosts} />
      </div>

      <div>
        {posts.map(post => (
          <PostComponent key={post._id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Feed