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

}

export const getStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('TODO');
  // TODO

  return {
    paths: [{ params: { slug: '' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({params }) => {
  const { slug } = params;
  
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug), {});

  // TODO
  return { props: {  }, revalidate: 60 * 60 * 24 };
};
