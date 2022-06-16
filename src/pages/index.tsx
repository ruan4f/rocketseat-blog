import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination: { next_page, results } }: HomeProps) {
  // TODO

  return (
    <>
      <Head>
        <title>Home | Blog</title>
      </Head>

      <main className={styles.contentContainer}>
        <div className={styles.posts}>
          {results.map((post: Post) => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>                
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <span>{post.first_publication_date}</span>
                <span>{post.data.author}</span>
              </a>
            </Link>
          ))}

          <a>Carregar mais posts</a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('TODO');

  return {
    props: {
      posts: null,
    },
    revalidate: 60 * 60 * 24,
  };
};
