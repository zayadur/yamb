import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity'
import { Post } from '../../typings'

const feedQuery = groq`
  *[_type == "post" && !manage] {
    _id,
    ...
  } | order(_createdAt desc)
`

type Data = {
  posts: Post[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts: Post[] = await sanityClient.fetch(feedQuery)
  res.status(200).json({ posts })
}
