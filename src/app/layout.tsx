// src/app/layout.tsx
import Link from 'next/link';
import React, { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
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
                        <Link href="/customers" passHref>
                            <span className="hover:text-gray-300 cursor-pointer">Customers</span>
                        </Link>
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
