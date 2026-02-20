import "./GenericTable.css"

type TableColumn<T> = {
    header: string;
    accessor?: keyof T;
    render?: (row: T) => React.ReactNode;
    className?: string;
};

type GenericTableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
};

function GenericTable<T>({ data, columns }: GenericTableProps<T>) {

    // Limita a máximo 6 columnas
    const safeColumns = columns.slice(0, 6);

    return (
        <div className="orders-table__card">
            <div className="orders-table__wrap">
                <table>
                    <thead>
                        <tr>
                            {safeColumns.map((col, index) => (
                                <th key={index} className={col.className}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {safeColumns.map((col, colIndex) => (
                                    <td key={colIndex} className={col.className}>
                                        {col.render
                                            ? col.render(row)
                                            : col.accessor
                                                ? (row[col.accessor] as React.ReactNode)
                                                : null}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GenericTable