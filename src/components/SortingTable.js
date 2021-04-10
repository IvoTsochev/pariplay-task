// Utils
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import { COLUMNS } from './columns';
// Styling
import './TheTable.css'



const SortingTable = () => {
    // State
    const [tableData, setTableData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Fetching data
    useEffect(() => {
        axios.get('https://services.odata.org/TripPinRESTierService/(S(3jgtctz5a2wyzb0gi3pxikvb))/People')
            .then(res => {
                const tableData = res.data.value;
                setTableData(tableData);
                setIsLoaded(true);
            })
            .catch(error => console.log(error))
    }, [])

    const columns = useMemo(() => COLUMNS, [tableData]);
    const data = useMemo(() => tableData, [tableData]);


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    }, useSortBy)

    return (
        <>
            {!isLoaded ?
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                :
                <table {...getTableProps()}>
                    <thead>{headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (<td {...cell.getCellProps()}>{cell.render('Cell')}</td>)
                                    })}
                                </tr>
                            )
                        })
                        }

                    </tbody>
                    <tfoot>
                        {footerGroups.map((footerGroup) => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {footerGroup.headers.map((column) => (
                                    <td {...column.getFooterProps(column.getSortByToggleProps())}>
                                        {column.render("Footer")}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))
                        }
                    </tfoot>
                </table>
            }

        </>

    )
}

export default SortingTable
