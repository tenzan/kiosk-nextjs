// src/pages/articles/index.js
import Link from 'next/link';

export default function Articles({ articles }) {
    return (
        <div>
            <h1>Articles</h1>
            {articles.map(article => (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.body}</p>
                    {/* Add more fields as needed */}
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles`);
        const { data } = await res.json();

        // Transform the data to get the attributes out of each article
        const articles = data.map(item => ({
            id: item.id,
            ...item.attributes
        }));

        return { props: { articles } };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return { props: { articles: [] } };
    }
}

