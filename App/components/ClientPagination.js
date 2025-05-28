import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const ClientPagination = (props) => {

//     const [itemOffset, setItemOffset] = useState(0);


//     const endOffset = itemOffset + props.pageCount;
// debugger
//     const currentItems = props.data.slice(itemOffset, endOffset);
//     const pageCount = Math.ceil(props.total / props.pageCount);
//     const handlePageClick = (event) => {debugger
//         event.selected +=1;
//         const newOffset = (event.selected *  props.pageCount) % props.total;

//         setItemOffset(newOffset);
//         return newOffset;
//     };



    return (


        <ReactPaginate
            previousLabel={<span className="webexflaticon flaticon-right-chevron"></span>}  
            nextLabel={<span className="webexflaticon flaticon-left-chevron"></span>}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={props.pageCount}
            marginPagesDisplayed={5}
            pageRangeDisplayed={5}
            onPageChange={props.onChange}
            containerClassName={'pagination-list'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            pageClassName="page-numbers"
        />
    )
}

export default ClientPagination;