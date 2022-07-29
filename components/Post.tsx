import { FormEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import TimeAgo from 'react-timeago'
import {
  ChatIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import { Post, Comment, CommentBody } from '../typings'
import { fetchComments } from '../utils/fetchComments'

interface Props {
  post: Post
}

function Post({ post }: Props) {

  const { data: session } = useSession()

  const [comments, setComments] = useState<Comment[]>([])

  const [commentBoxOpen, setCommentBoxOpen] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(post._id)
    setComments(comments)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const comment: CommentBody = {
      comment: input,
      postId: post._id,
      user: session?.user?.name || 'guest',
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: 'POST',
    })

    setInput('')
    setCommentBoxOpen(false)
    refreshComments()

    return result
  }

  return (
    <div>
      <div className='flex flex-col p-5 space-x-3 border-gray-100 border-y'>
        <div className='flex space-x-3'>
          <div className='flex items-end space-x-1'>
            <p className='mr-1 font-bold'>{post.user}</p> ·
            <TimeAgo
              className='text-sm text-gray-500'
              date={post._createdAt}
            />
          </div>
        </div>
        <p className='pt-3'>{post.post}</p>
        {post.image && (
          <img src={post.image} alt='' className='object-cover m-5 mb-1 ml-0 rounded-md shadow-sm max-h-60' />
        )}
        <div className='flex justify-between mt-5'>
          <div
            onClick={() => session && setCommentBoxOpen(!commentBoxOpen)}
            className='flex items-center space-x-3 text-gray-400 duration-100 cursor-pointer hover:scale-105 active:scale-95 transition-translate'
          >
            <ChatIcon className='w-5 h-5' />
            <p>{comments.length}</p>
          </div>
          <div className='flex items-center space-x-3 text-gray-400 duration-100 cursor-pointer hover:scale-105 active:scale-95 transition-translate'>
            <HeartIcon className='w-5 h-5' />
          </div>
          <div className='flex items-center space-x-3 text-gray-400 duration-100 cursor-pointer hover:scale-105 active:scale-95 transition-translate'>
            <ShareIcon className='w-5 h-5' />
          </div>
        </div>
      </div>
      {commentBoxOpen && (
        <form onSubmit={handleSubmit} className='flex m-3 space-x-3'>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className='flex-1 p-2 m-2 bg-gray-100 rounded-md outline-none'
            type='text'
            placeholder='Reply'
          />
          <button
            disabled={!input}
            type='submit'
            className='p-2 m-2 font-bold text-white duration-100 ease-out bg-black rounded-md enabled:transform-translate enabled:hover:scale-105 enabled:active:scale-95 disabled:opacity-40'
          >
            Comment
          </button>
        </form>
      )}
      {comments?.length > 0 && (
        <div className='p-5 my-2 space-y-5 overflow-y-scroll border-b max-h-44'>
          {comments.map(comment => (
            <div key={comment._id} className='flex flex-col space-x-2'>
              <div>
                <div className='flex space-x-1'>
                  <p className='mr-1 text-sm font-bold'>{comment.user}</p> ·
                  <TimeAgo
                    className='text-sm text-gray-500'
                    date={comment._createdAt}
                  />
                </div>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Post