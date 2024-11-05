import React from 'react';
import Navbar from './Navbar';
import '../styles.css';

const PageLayout = ({ children }) => {
    return (
        <div className="page-layout">
            <Navbar />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
