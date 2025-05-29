// DataTable.jsx
// Script to build the data table component

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
        cell: info => {
          const row = info.row.original;
          return (
            <a
              href={row.company_website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 underline"
            >
              {info.getValue()}
            </a>
          );
        },
      },
      {
        accessorKey: 'company_headquarters',
        header: 'Headquarters',
        filterFn: 'includesString',
      },
      {
        accessorKey: 'type_of_company_by_product',
        header: 'Company Type',
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
        accessorKey: 'has_in_house_marketplace',
        header: 'Has In-House Marketplace',
        filterFn: 'includesString',
      },
      {
        accessorKey: 'in_house_marketplace_name',
        header: 'In-House Marketplace Name',
        cell: info => {
          const row = info.row.original;
          return (
            <a
              href={row.in_house_marketplace_website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 underline"
            >
              {info.getValue()}
            </a>
          );
        },
      },
      {
        accessorKey: 'in_house_marketplace_details',
        header: 'In-House Marketplace Details',
        filterFn: 'includesString',
      },
      {
        accessorKey: 'product_project_assisted_by_data_workers',
        header: 'Type of Work Conducted by Data Workers',
        filterFn: 'includesString',
      },
      {
        accessorKey: 'known_worker_locations',
        header: 'Known Worker Locations',
        filterFn: 'includesString',
      },
      {
        id: 'articles',
        header: 'Relevant Articles',
        cell: info => {
          const row = info.row.original;
          const articles = [];
      
          for (let i = 1; i <= 5; i++) {
            const title = row[`article_${i}_title`];
            const link = row[`article_${i}_link`];
      
            if (title && link) {
              articles.push(
                <div key={i}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-xs"
                  >
                    {title}
                  </a>
                </div>
              );
            }
          }
      
          return <div className="flex flex-col gap-3">{articles}</div>;
        },
      }
      
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
          {/* min-w-full wraps the column width. min-w-max extends the column width. */}
          <table className="min-w-full border border-gray-300 text-xs"> 
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
            <tbody className="bg-white">
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
  