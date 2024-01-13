// src/app/layout.tsx
import Link from 'next/link';
import React, { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
    isUserAuthenticated: boolean;
};

const Layout = ({ children, isUserAuthenticated }: LayoutProps) => {
    return (
        <>
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between">
                    <div className="flex space-x-4">
                        <Link href="/" passHref>
                            <span className="hover:text-gray-300 cursor-pointer">Home</span>
                        </Link>
                        <Link href="/articles" passHref>
                            <span className="hover:text-gray-300 cursor-pointer">Articles</span>
                        </Link>
                        {isUserAuthenticated && (
                            <Link href="/customers" passHref>
                                <span className="hover:text-gray-300 cursor-pointer">Customers</span>
                            </Link>
                        )}
                    </div>
                    <div>
                        {isUserAuthenticated ? (
                            <a href="/api/logout" className="hover:text-gray-300 cursor-pointer">Logout</a>
                        ) : (
                            <Link href="/login" passHref>
                                <span className="hover:text-gray-300 cursor-pointer">Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
            <main className="container mx-auto p-4">
                {children}
            </main>
        </>
    );
};

export default Layout;
