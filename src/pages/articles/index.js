// In src/pages/articles/index.js

import Layout from '../../app/layout';

export default function Articles({ articles }) {
    // Handle case where articles is undefined or empty
    if (!articles || articles.length === 0) {
        return (
            <Layout>
                <h1>Articles</h1>
                <p>No articles available.</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1>Articles</h1>
            {articles.map(article => (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.body}</p>
                </div>
            ))}
        </Layout>
    );
}

export async function getServerSideProps() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles`);
        const { data } = await res.json();

        const articles = data.map(item => ({
            id: item.id,
            ...item.attributes
        }));

        return { props: { articles } };
    } catch (error) {
        console.error('Error fetching articles:', error);
        // Return an empty array if there's an error or data is not available
        return { props: { articles: [] } };
    }
}