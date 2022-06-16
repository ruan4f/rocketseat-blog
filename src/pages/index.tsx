import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RichText } from 'prismic-dom';

import { FiCalendar, FiUser } from "react-icons/fi";
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
        <title>Blog | Home</title>
      </Head>

      <main className={styles.contentContainer}>
        <div className={styles.posts}>
          {results.map((post: Post) => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <span>
                  <FiCalendar /><time>{post.first_publication_date}</time>
                  <FiUser />{post.data.author}
                </span>
              </a>
            </Link>
          ))}

          <a>Carregar mais posts</a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts');

  return {
    props: {
      postsPagination: { next_page: postsResponse.next_page, results: postsResponse.results },
    }
  };
};
