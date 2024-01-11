import React, { useCallback, useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'

const MyPagination = ({ total, current, onChangePage, valueDisabled }) => {

    const [numberLimit, setNumberLimit] = useState(3)
    console.log(current)
    const handleNextClick = () => {
        onChangePage(current + 1)
    }

    useEffect(() => {
        if (current < 3) {
            setNumberLimit(3)
        }
        if (current >= 3) {
            if (numberLimit >= total) {
                return
            }
            else {
                setNumberLimit((prev) => prev + 1)
            }
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

        for (let page = 1; page <= total; page++) {
            items.push(<Pagination.Item disabled key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                {page}
            </Pagination.Item>)
        }

        if (current < total) {
            items.push(<Pagination.Next disabled key="next" onClick={() => onChangePage(current + 1)} />)
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

        // aqui condicion que puse para que se ponga el ..,..
        if (total >= 4) {
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
                items.push(<Pagination.Item>{total}</Pagination.Item>);
            }
        }

        // aqui otra condicion !!!! para el tema del elipsis

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
