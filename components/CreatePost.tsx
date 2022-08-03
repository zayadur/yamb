import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  EmojiHappyIcon,
  PhotographIcon
} from '@heroicons/react/outline'
import { Post, PostBody } from '../typings'
import { fetchPosts } from '../utils/fetchPosts'

interface Props {
  setPosts: Dispatch<SetStateAction<Post[]>>
}

function CreatePost({ setPosts }: Props) {

  const [input, setInput] = useState<string>('')

  const [image, setImage] = useState<string>('')
  const imageInputRef = useRef<HTMLInputElement>(null)

  const { data: session } = useSession()

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)

  const addImageToPost = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if (!imageInputRef.current?.value) return
    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageBoxOpen(false)
  }

  const createPost = async () => {
    const postData: PostBody = {
      post: input,
      user: session?.user?.name || 'guest',
      image: image,
    }

    const result = await fetch(`/api/addPost`, {
      body: JSON.stringify(postData),
      method: 'POST',
    })

    const json = await result.json()

    const newPosts = await fetchPosts()
    setPosts(newPosts)

    return json
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    createPost()
    setInput('')
    setImage('')
    setImageBoxOpen(false)
  }

  return (
    <div className='flex p-5 space-x-2 border-b'>
      <div className='flex items-center flex-1 pl-2'>
        <form className='flex flex-col flex-1'>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type='text'
            placeholder='Post'
            className='h-24 text-xl outline-none placeholder:text-xl'
          />
          <div className='flex items-center'>
            <div className='flex flex-1 space-x-2'>
              <PhotographIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} className='w-5 h-5 transition-transform duration-100 ease-out cursor-pointer hover:scale-105 active:scale-95' />
              <EmojiHappyIcon className='w-5 h-5 transition-transform duration-100 ease-out cursor-pointer hover:scale-105 active:scale-95' />
            </div>
            <button
              disabled={!input || !session}
              onClick={handleSubmit}
              className='px-5 py-2 font-bold text-white duration-100 ease-out bg-black rounded-md enabled:transform-translate enabled:hover:scale-105 enabled:active:scale-95 disabled:opacity-40'
            >
              Post
            </button>
          </div>
          {imageBoxOpen && (
            <form className='flex px-4 py-2 mt-5 bg-gray-100 rounded-md'>
              <input ref={imageInputRef} className='flex-1 p-2 bg-transparent outline-none placeholder:text-slate-800' type='text' placeholder='Link' />
              <button
                disabled={!input || !session}
                type='submit'
                onClick={addImageToPost}
                className='font-bold'
              >
                Add
              </button>
            </form>
          )}
          {image && (
            <img className='object-contain mt-10 rounded-md shadow-lg' src={image} alt='' />
          )}
        </form>
      </div>
    </div>
  )
}

export default CreatePost