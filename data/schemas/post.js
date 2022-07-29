export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'post',
      title: 'Post',
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
      type: 'string'
    },
    {
      name: 'manage',
      title: 'Manage',
      description: 'toggle if post is inappropriate',
      type: 'boolean',
    },
  ]
}
