// Utils
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { COLUMNS } from '../columns';
// Styling
import './TheTable.css'


const TheTable = () => {
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
    }, [])

    const columns = useMemo(() => COLUMNS, [tableData]);
    const data = useMemo(() => tableData, [tableData]);

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance;

    return (
        <>
            {isLoaded ?
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                :
                <table {...getTableProps()}>

                    <thead>
                        {
                            headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()} >
                                                {column.render('Header')}
                                            </th>
                                        ))
                                    }

                                </tr>
                            ))
                        }

                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {
                            rows.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                return (
                                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                )
                                            })
                                        }

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            }

        </>

    )
}

export default TheTable
