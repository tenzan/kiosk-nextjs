// pages/login.js
import { useState } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`;

        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the JWT token in a cookie
                Cookies.set('jwt', data.jwt, { expires: 7 }); // Expires in 7 days, for example

                // Redirect to the homepage or dashboard page
                Router.push('/');
            } else {
                setError(data.message[0].messages[0].message);
            }
        } catch (err) {
            setError('Failed to login');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
                <div>
                    <label htmlFor="identifier">Username or Email</label>
                    <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}
