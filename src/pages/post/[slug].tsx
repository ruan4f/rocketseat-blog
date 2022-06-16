import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  // TODO
  return (
    <>
      <Head>
        <title>Blog | Post</title>
      </Head>

      <main>

      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');
  // TODO

  return {
    paths: [{ params: { slug: 'como-utilizar-hooks' } }, { params: { slug: 'criando-um-app-cra-do-zero' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug), {});

  console.log(slug);
  console.log(JSON.stringify(response, null, 2));

  // TODO
  return { props: {}, revalidate: 60 * 60 * 24 };
};
