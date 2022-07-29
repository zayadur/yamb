export type PostBody = {
  post: string
  user: string
  image?: string
}

export interface Post extends PostBody {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: 'post'
  manage: boolean
}

export type CommentBody = {
  comment: string
  postId: string
  user: string
}

export interface Comment extends CommentBody {
  _createdAt: string
  _id: string
  _rev: string
  _type: 'comment'
  _updatedAt: string
  post: {
    _ref: string
    _type: 'reference'
  }
}
