import React from 'react';
import '../styles.css';

const Pagination = ({ pages, setPages }) => {
    const leftPages = () => {
        if (pages > 1) setPages(pages - 1);
    };

    const rightPages = () => {
        setPages(pages + 1);
    };

    return (
        <div className="pagination">
            <button disabled={pages === 1} onClick={leftPages}>Prev</button>
            <p>Pages: {pages}</p>
            <button onClick={rightPages}>Next</button>
        </div>
    );
};

export default Pagination;
