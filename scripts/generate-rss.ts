import { convertToArticleList, getPublishedArticles } from '../lib/notion';
import { mkdirSync, writeFileSync } from 'fs';

import RSS from 'rss';
import slugify from 'slugify';

export async function generateRssFeed() {
  const resp = await getPublishedArticles(process.env.BLOG_DATABASE_ID);
  const articles = await convertToArticleList(resp);

  const feed = new RSS({
    title: 'Mohd Sameer',
    site_url: 'https://myselfmohdsameer.vercel.app',
    feed_url: 'https://myselfmohdsameer.vercel.app/rss.xml'
  });

  articles.articles.map((post) => {
    feed.item({
      title: post.title,
      url: `https://myselfmohdsameer.vercel.app/blog/${slugify(
        post.title
      ).toLocaleLowerCase()}`,
      date: post.publishedDate,
      description: post.summary
    });
  });

  mkdirSync('./public/rss', { recursive: true });
  writeFileSync('./public/rss/feed.xml', feed.xml({ indent: true }));
}
