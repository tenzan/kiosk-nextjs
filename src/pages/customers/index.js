// src/pages/customers/index.js
import Layout from '../../app/layout';
import { isAuthenticated } from '../../../utils/auth';

export default function Customers({ customers, isUserAuthenticated }) {
    if (!customers || customers.length === 0) {
        return (
            <Layout isUserAuthenticated={isUserAuthenticated}>
                <h1>Customers</h1>
                <p>No customers available.</p>
            </Layout>
        );
    }

    return (
        <Layout isUserAuthenticated={isAuthenticated}>
            <h1>Customers</h1>
            {customers.map(customer => (
                <div key={customer.id}>
                    <h2>{customer.name}</h2>
                </div>
            ))}
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const token = context.req.cookies['jwt'];
    const isUserAuthenticated = !!token;

    if (!isUserAuthenticated) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/customers`;
        const res = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await res.json();

        if (!json.data || !Array.isArray(json.data)) {
            throw new Error("Invalid response structure");
        }

        const customers = json.data.map(item => ({
            id: item.id,
            ...item.attributes
        }));

        return { props: { customers, isUserAuthenticated } };
    } catch (error) {
        console.error('Error fetching customers:', error);
        return { props: { customers: [], isUserAuthenticated } };
    }
}