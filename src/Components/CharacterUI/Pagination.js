import Pagination from '@mui/material/Pagination';
import React from 'react';

function PaginationUI({currentPage, goToPage, pages}) {

    const handleOnChange = (event, value) => {
        goToPage(value);
    }

    return(
        <Pagination page={currentPage} count={pages} onChange={handleOnChange} />
    )
}

export default PaginationUI;