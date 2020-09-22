import React, { FC } from 'react';
import ReactPaginate from "react-paginate";
import s from "./users.module.css";
type PropsType = {
    usersCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
}

const Paginator: FC<PropsType> = ({ usersCount, pageSize, onPageChange }) => {

    const numberOfPages = Math.ceil(usersCount / pageSize);

    return (
        <ReactPaginate
            pageCount={numberOfPages}
            pageRangeDisplayed={1}
            marginPagesDisplayed={3}
            containerClassName={s.wrapper}
            pageClassName={s.page}
            breakClassName={s.break}
            previousClassName={s.previous}
            nextClassName={s.next}
            activeClassName={s.active}
            pageLinkClassName={s.link}
            onPageChange={(e: any) => onPageChange(e)}
            activeLinkClassName={s.activeLink}
            previousLinkClassName={s.btnLink}
            nextLinkClassName={s.btnLink}
        ></ReactPaginate>
    )
}
export default Paginator;