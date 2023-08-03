import { useState } from 'react';

import ReactPaginate from 'react-paginate';
import ListComponent, { IListProps } from '../list/list';

import './paginate.css'
import { TMenuProps } from '../menu/menu';
export default function PaginatedList({ menuList, dataPerPage, data }: { menuList: TMenuProps[], data: IListProps[], dataPerPage: number }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // calculate end offset for range(start, end)
  const endOffset = itemOffset + dataPerPage;

  // git slice of current range
  const currentdata = data.slice(itemOffset, endOffset);

  // get number of pages ( + 1 for pages with content less than pageCount)
  const pageCount = Math.ceil(data.length / dataPerPage);

  // page change onclick handler
  const handlePageClick = (event: any) => {
    // get new offset
    const newOffset = (event.selected * dataPerPage) % data.length;
    // set starting offset to the new offset
    setItemOffset(newOffset);
  };

  return (
    <>
      <ListComponent menuList={menuList} rows={currentdata} />
      <ReactPaginate
        className='pagination-container'
        pageLinkClassName='page-li'
        activeLinkClassName='page-li-active'
        nextLinkClassName='next-li'
        disabledLinkClassName='disabled-li'
        previousLinkClassName='prev-li'
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}