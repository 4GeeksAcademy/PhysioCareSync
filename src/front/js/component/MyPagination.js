import React, { useCallback, useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import '../../styles/Pagination.css'
import { useNavigate } from 'react-router-dom'

const MyPagination = ({ total, current, onChangePage, valueDisabled }) => {
    const [numberLimit, setNumberLimit] = useState(3)
    const navigate = useNavigate()
    const [limitPaginationNumber, setLimitPaginationNumber] = useState(numberLimit)
    const handleNextClick = () => {
        onChangePage(current + 1)
    }


    useEffect(() => {
        if (current < 3) {
            setNumberLimit(3)
            setLimitPaginationNumber(3)
        }
        if (current >= 3) {

            if (current === total) {
                setNumberLimit(current)
                setLimitPaginationNumber(current)
            }
            else if (current < total)
                setNumberLimit(current + 1)
            setLimitPaginationNumber(current + 1)
        }
        if (current === 4 && total === 5) {
            setNumberLimit(5)
        }
        if (current + 3 >= total) {
            setLimitPaginationNumber(total)
        }

    }, [current])

    let items = []

    if (!valueDisabled) {
        if (current > 1) {
            items.push(<Pagination.Prev disabled key="prev" onClick={() => onChangePage(current - 1)} />)
        }
        else if (current <= 1) {
            items.push(<Pagination.Prev disabled key="prev" onClick={() => onChangePage(current - 1)} />)
        }
        if (total >= 4) {
            if (current >= 5) {
                items = items.concat([
                    <Pagination.Item disabled key={1} data-page={1} active={1 === current} onClick={() => onChangePage(1)}>
                        {1}
                    </Pagination.Item>,
                    <Pagination.Ellipsis disabled key="ellipsis-1" />
                ])
                for (let page = numberLimit - 2; page <= limitPaginationNumber; page++) {
                    items.push(<Pagination.Item disabled key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                        {page}
                    </Pagination.Item>)
                }
                if (current + 3 >= total) {
                }
                else {
                    items.push(<Pagination.Ellipsis disabled key="ellipsis-2" />);
                    items.push(<Pagination.Item disabled onClick={() => onChangePage(total)}>{total} </Pagination.Item >);
                }
            }
            else {
                for (let page = 1; page <= numberLimit; page++) {
                    items.push(<Pagination.Item disabled key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                        {page}
                    </Pagination.Item>)
                }
                if (numberLimit < total - 1) {
                    items.push(<Pagination.Ellipsis disabled key="ellipsis" />);
                }
                if (numberLimit >= total) {

                } else {
                    items.push(<Pagination.Item disabled onClick={() => onChangePage(total)}>{total}</Pagination.Item>);
                }
            }


        }
        else {
            for (let page = 1; page <= total; page++) {
                items.push(<Pagination.Item
                    className='custom-pagination-item'
                    disabled key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                    {page}
                </Pagination.Item>)
            }
        }
        if (current < total) {
            items.push(<Pagination.Next disabled key="next" onClick={() => handleNextClick()} />)
        }
        else if (current >= total) {
            items.push(<Pagination.Next disabled key="next" onClick={() => onChangePage(current + 1)} />)

        }


    }
    else {
        if (current > 1) {
            items.push(<Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />)
        }
        else if (current <= 1) {
            items.push(<Pagination.Prev disabled key="prev" onClick={() => onChangePage(current - 1)} />)
        }
        if (total >= 4) {
            if (current >= 5) {
                items = items.concat([
                    <Pagination.Item key={1} data-page={1} active={1 === current} onClick={() => onChangePage(1)}>
                        {1}
                    </Pagination.Item>,
                    <Pagination.Ellipsis key="ellipsis-1" />
                ])
                for (let page = numberLimit - 2; page <= limitPaginationNumber; page++) {
                    items.push(<Pagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                        {page}
                    </Pagination.Item>)
                }
                if (current + 3 >= total) {
                }
                else {
                    items.push(<Pagination.Ellipsis key="ellipsis-2" />);
                    items.push(<Pagination.Item onClick={() => onChangePage(total)}>{total} </Pagination.Item >);
                }
            }
            else {
                for (let page = 1; page <= numberLimit; page++) {
                    items.push(<Pagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                        {page}
                    </Pagination.Item>)
                }
                if (numberLimit < total - 1) {
                    items.push(<Pagination.Ellipsis key="ellipsis" />);
                }
                if (numberLimit >= total) {

                } else {
                    items.push(<Pagination.Item onClick={() => onChangePage(total)}>{total}</Pagination.Item>);
                }
            }


        }

        else {
            for (let page = 1; page <= total; page++) {
                items.push(<Pagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                    {page}
                </Pagination.Item>)
            }
        }
        if (current < total) {
            items.push(<Pagination.Next key="next" onClick={() => handleNextClick()} />)
        }
        else if (current >= total) {
            items.push(<Pagination.Next disabled key="next" onClick={() => onChangePage(current + 1)} />)

        }
    }


    return (

        <Pagination>{items}</Pagination>
    )
}

export default MyPagination
