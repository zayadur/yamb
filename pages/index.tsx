
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'
import { Post } from '../typings'
import { fetchPosts } from '../utils/fetchPosts'

interface Props {
  posts: Post[]
}

const Home = ({ posts }: Props) => {
  return (
    <div className='max-h-screen mx-auto lg:max-w-6xl'>
      <Head>
        <title>YAMb</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Toaster 
        position='bottom-right'
        reverseOrder={false}
      />
      <main className='grid grid-cols-9'>
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await fetchPosts()

  return {
    props: {
      posts,
    },
  }
}
