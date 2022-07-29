import type { NextApiRequest, NextApiResponse } from 'next'
import { PostBody } from '../../typings'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: PostBody = JSON.parse(req.body)
  const mutations = {
    mutations: [
      {
        create: {
          _type: 'post',
          post: data.post,
          user: data.user,
          manage: false,
          image: data.image,
        }
      }
    ]
  }

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
  const result = await fetch(apiEndpoint, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutations),
    method: 'POST',
  })

  const json = await result.json()
  res.status(200).json({ message: 'Post success!' })
}
