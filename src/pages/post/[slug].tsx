import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
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

export default function Post({ post }: PostProps) {
  //TODO
  return (
    <>
      <Head>
        <title>Blog | Post</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <img src={post.data?.banner?.url} alt="banner" />
          <h1>{post.data.title}</h1>
          <time>{post.first_publication_date}</time>

        </article>
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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug), {});

  const dateToString = format(
    new Date(response.first_publication_date),
    "d MMM yyyy",
    {
      locale: ptBR,
    }
  );

  const post = {
    first_publication_date: dateToString,
    data: response.data
  }

  // TODO
  return { props: { post } };
};
