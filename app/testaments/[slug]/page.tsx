import { notFound } from "next/navigation"
import PostView from "./PostView"
import { visiblePosts, readingMinutes, formatDate } from "../posts"

export const dynamicParams = false

export function generateStaticParams() {
  return visiblePosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = visiblePosts().find(p => p.slug === slug)
  return post
    ? { title: `${post.title} · Testaments`, description: post.summary }
    : { title: "Testaments · Zayviana" }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = visiblePosts().find(p => p.slug === slug)
  if (!post) notFound()
  return <PostView post={post} date={formatDate(post.date)} minutes={readingMinutes(post)} />
}
