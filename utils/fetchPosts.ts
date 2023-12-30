import { Post } from '../typings'
export const fetchPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPosts`)
  if (!res.ok) {
    console.error(`Error fetching posts: ${res.status} ${res.statusText}`);
    return [];
  }
  const data = await res.json()
  const posts: Post[] = data.posts
  return posts
}

