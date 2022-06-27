## Outline

- [Features](https://github.com/0alexzhong0/blog#features)
- [Web Performance Tests](https://github.com/0alexzhong0/blog#web-performance-tests)
- [Quick Start](https://github.com/0alexzhong0/blog#quick-start)
- [Deploy with Netlify](https://github.com/0alexzhong0/blog#deploy-with-netlify)
- [Folder Structure](https://github.com/0alexzhong0/blog#folder-structure)

## Features

- [Lost Grid](http://lostgrid.org).
- [Modern font stack](https://bitsofco.de/the-new-system-font-stack).
- Beautiful typography inspired by [matejlatin/Gutenberg](https://github.com/matejlatin/Gutenberg).
- Syntax highlighting in code blocks using [PrismJS](http://prismjs.com).
- [Mobile-First](https://medium.com/@mrmrs_/mobile-first-css-48bc4cc3f60f) approach in development.
- Archive organized by tags and categories.
- Pagination support.
- [Netlify CMS](https://www.netlifycms.org) support.
- Google Analytics.
- Disqus Comments.
- [Flow](https://flow.org/) static type checking.

## Quick Start Guide

### Start Developing

Navigate into your new site’s directory and start it up, this also runs the Netlify CMS locally.

```bash
yarn dev
```

Your site is now running at `http://localhost:8000`!

Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

### Writing And Adding An Article

Option 1: Add the article from the [admin console](http://localhost:8000/admin).
Option 2: In the `content/posts` directory, create a new file preferrably follow the naming convention of yyyy-mm-dd-\<title\>.md. Then copy and paste the content from one of the other files and start editing.


## Deploy with Netlify

[Netlify](https://netlify.com) CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. Use the button below to build and deploy your own copy of the repository:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/alxshelepenok/gatsby-starter-lumen" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. Next, you’ll need to set up Netlify’s Identity service to authorize users to log in to the CMS.

## Deploy to Github Pages

To deploy to github pages, simply do the following:

- Ensure that your `package.json` file correctly reflects where this repo lives
- Change the `pathPrefix` in your `config.js`
- Run the standard deploy command

```sh
npm run deploy
```

## Folder Structure

```
└── content
    ├── pages
    └── posts
└── static
    ├── admin
    └── media
└── src
    ├── assets
    │   └── scss
    │       ├── base
    │       └── mixins
    ├── cms
    │   └── preview-templates
    ├── components
    │   ├── Feed
    │   ├── Icon
    │   ├── Layout
    │   ├── Page
    │   ├── Pagination
    │   ├── Post
    │   │   ├── Author
    │   │   ├── Comments
    │   │   ├── Content
    │   │   ├── Meta
    │   │   └── Tags
    │   └── Sidebar
    │       ├── Author
    │       ├── Contacts
    │       ├── Copyright
    │       └── Menu
    ├── constants
    ├── templates
    └── utils

```
