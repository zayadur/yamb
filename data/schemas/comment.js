export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'user',
      title: 'User',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
    {
      name: 'post',
      title: 'Post reference',
      type: 'reference',
      to: {
        type: 'post',
      }
    }
  ],
}
