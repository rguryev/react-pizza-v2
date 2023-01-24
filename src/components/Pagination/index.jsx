import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

// TODO: Pagination by library to Obsidian: Pagination

const Pagination = ({ onChangePage }) => {
	return (
		<div>
			<ReactPaginate
				className={styles.root}
				breakLabel='...'
				nextLabel='>'
				previousLabel='<'
				onPageChange={e => onChangePage(e.selected + 1)}
				pageRangeDisplayed={4}
				pageCount={3}
				renderOnZeroPageCount={null}
			/>
		</div>
	);
};

export default Pagination;