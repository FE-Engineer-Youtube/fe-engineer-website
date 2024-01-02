import type { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async () => {
  // These two functions get a list of all the posts and projects, using prisma
  // I will write more blog posts on prisma in the future and explain how it's used
  // const posts = await getPosts();
  // const projects = await getProjects();

  // const lastModifiedBlogDate = posts[posts.length - 1]?.updatedAt.toISOString();
  // const lastModifiedProjectDate = posts[projects.length - 1]?.updatedAt.toISOString();

  const url = `
<url>
<loc></loc>
<lastmod></lastmod>
</url>`

  const content = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      </urlset>
      `

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  })
}
