import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const Pagination = (props) => {
    let [activeNumber, setActiveNumber] = useState(0);
    const router = useRouter();
    const handlePageClick = (data) => {
        setActiveNumber(data.selected);
        const currentPath = router.pathname;
        const currentQuery = { ...router.query };

        currentQuery.PageNumber = data.selected + 1;

        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    }




    return (
        <ReactPaginate
            previousLabel={<span className="webexflaticon flaticon-right-chevron"></span>}
            initialPage={router.query.PageNumber ? router.query.PageNumber - 1 : 0}
            forcePage={router.query.PageNumber ? router.query.PageNumber - 1 : 0}
            nextLabel={  <span className="webexflaticon flaticon-left-chevron"></span>}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={props.pageCount}
            marginPagesDisplayed={5}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination-list'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            pageClassName="page-numbers"
            hrefBuilder={(pageNum) => `/article?PageNumber=${pageNum}`}
        />
    )
}

export default Pagination;