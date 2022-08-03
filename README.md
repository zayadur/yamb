# Yet Another Microblog

Yep, it's another microblogging platform.

# Development

Client was built with React and Next.js.\
Content is stored on Sanity's CMS.\
Styling was handled by TailwindCSS.\
Twitter authentication is handled by NextAuth.js.

# Deployment

## Local
`npm run dev` in `/` to launch local instance (default is localhost:3000)\
`sanity start` in `/data` to start CMS dashboard (default is localhost:3333)

## Remote
Project and variables are hosted on Vercel by linking the GitHub repository and manual configuration via the dashboard.

# Features

Authentication with Twitter\
Creating posts in the global feed\
Adding images to posts\
Commenting on posts