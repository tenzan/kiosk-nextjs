// src/pages/index.js
import React from 'react';
import Layout from '../app/layout';
import Articles from './articles/index';

const HomePage = () => {
    return (
        <Layout>
            <Articles />
        </Layout>
    );
};

export default HomePage;
