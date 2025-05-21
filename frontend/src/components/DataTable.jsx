// DataTable.jsx

// DataTable.jsx

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
  } from '@tanstack/react-table';
  import { useState, useMemo } from 'react';
  
  export default function DataTable({ data }) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);
  
    const columns = useMemo(() => [
      {
        accessorKey: 'company_name',
        header: 'Company',
        filterFn: 'includesString',
        cell: info => (
          <span className="font-bold text-blue-600">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'company_website',
        header: 'Website',
        cell: info => (
          <a
            href={info.getValue()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            {info.getValue()}
          </a>
        ),
      },
      {
        accessorKey: 'company_headquarters',
        header: 'Headquarters',
        filterFn: 'includesString',
      },
      {
        accessorKey: 'workforce_model',
        header: 'Workforce Model',
        filterFn: 'includesString',
        cell: info => (
          <span
            className={
              info.getValue() === 'Contractor'
                ? 'text-red-500'
                : 'text-green-600'
            }
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'pay_rate',
        header: 'Pay Rate',
        filterFn: 'includesString',
      },
      {
        accessorKey: 'known_worker_locations',
        header: 'Known Locations',
        filterFn: 'includesString',
      },
    ], []);
  
    const table = useReactTable({
      data,
      columns,
      state: {
        globalFilter,
        columnFilters,
      },
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    });
  
    return (
      <div className="w-full p-4">
        {/* Global Search */}
        <input
          type="text"
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
  
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-4 py-2 border text-left align-top">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() && (
                        <div className="mt-1">
                          <ColumnFilter column={header.column} />
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-2 border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
  
  // Renders a simple input box for string filtering
  function ColumnFilter({ column }) {
    const columnFilterValue = column.getFilterValue() ?? "";
  
    return (
      <input
        type="text"
        value={columnFilterValue}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Filter...`}
        className="p-1 border rounded w-full text-xs"
      />
    );
  }
  