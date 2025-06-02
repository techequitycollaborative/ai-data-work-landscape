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
        header: () => (
          <div
          title="Type of company defined by the primary products and services it offers (i.e., tools, workforce, or both)"
          className="flex items-center gap-1 cursor-help select-none"
        >
          Company Type
          <span className="text-gray-500">i</span>
        </div>
        ),
        size: 250, // set custom width of the column
        filterFn: 'includesString',
        cell: info => {
          const value = info.getValue();
          let className = "";
      
          if (value === "Only tools") {
            className = "bg-[#ade4d1] text-black px-2 py-1 rounded";
          } else if (value === "Only workforce") {
            className = "bg-[#cde1f9] text-black px-2 py-1 rounded";
          } else if (value === "Tools + workforce") {
            className = "bg-[#f6d7ff] text-black px-2 py-1 rounded";
          }
      
          return <span className={`text-xs ${className}`}>{value}</span>;
        }
      },
      {
        accessorKey: 'workforce_model',
        header: () => (
          <div
          title="The type of labor structure the company uses (e.g., contractor, marketplace, BPO)"
          className="flex items-center gap-1 cursor-help select-none"
        >
          Workforce Model
          <span className="text-gray-500">i</span>
        </div>
        ),
        size: 200, // set custom width of the column
        filterFn: 'includesString',
        cell: info => {
          const value = info.getValue() || "";
          const keywords = [
            {
              match: "Marketplace Model",
              style: "bg-[#00495e] text-white px-2 py-1 rounded",
            },
            {
              match: "BPO model",
              style: "bg-[#712f39] text-white px-2 py-1 rounded",
            },
            {
              match: "Unclear",
              style: "bg-[#444716] text-white px-2 py-1 rounded",
            },
            {
              match: "N/A",
              style: "text-gray-400",
            },
          ];
        
          // Match all defined keywords
          const parts = value.split(/,\s*/).map(part => {
            const keyword = keywords.find(k => k.match.toLowerCase() === part.toLowerCase());
            if (keyword) {
              return (
                <span key={part} className={`mr-2 ${keyword.style}`}>
                  {part}
                </span>
              );
            }
            return <span key={part} className="mr-2">{part}</span>;
          });
        
          return <div className="flex flex-wrap gap-1">{parts}</div>;
        },
      },
      {
        accessorKey: 'has_in_house_marketplace',
        header: () => (
          <div
          title="Does the company have in-house subsidiary marketplaces for data work? (i.e., Scale AI has Outlier and Remotasks)"
          className="flex items-center gap-1 cursor-help select-none"
        >
          Has In-House Marketplace
          <span className="text-gray-500">i</span>
        </div>
        ),
        filterFn: 'includesString',
      },
      {
        accessorKey: 'in_house_marketplace_name',
        header: 'Name of In-House Marketplace',
        cell: info => {
          const row = info.row.original;
          return (
            <a
              href={row.in_house_marketplace_website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {info.getValue()}
            </a>
          );
        },
      },
      {
        accessorKey: 'in_house_marketplace_details',
        header: () => (
          <div
          title="Additional information about the company's in-house marketplace(s)"
          className="flex items-center gap-1 cursor-help select-none"
        >
          In-House Marketplace Details
          <span className="text-gray-500">i</span>
        </div>
        ),
        size: 250, // set custom width of the column
        filterFn: 'includesString',
      },
      {
        accessorKey: 'product_project_assisted_by_data_workers',
        header: () => (
          <div
          title="Examples of the type of work data workers do for the company (e.g., data collection, annotation, model training)"
          className="flex items-center gap-1 cursor-help select-none"
        >
          Type of Work Conducted by Data Workers
          <span className="text-gray-500">i</span>
        </div>
        ),
        size: 300, // set custom width of the column
        filterFn: 'includesString',
      },
      {
        accessorKey: 'known_worker_locations',
        header: () => (
          <div
          title="Known locations where data workers for this company are based. Not exhaustive."
          className="flex items-center gap-1 cursor-help select-none"
        >
          Known Worker Locations
          <span className="text-gray-500">i</span>
        </div>
        ),
        filterFn: 'includesString',
      },
      {
        id: 'articles',
        header: 'Relevant Articles',
        size: 400, // set custom width of the column
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
          <table className="min-w-full table-auto border border-gray-300 text-xs"> 
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} 
                      className="px-4 py-2 border text-left align-top"
                      style={{ width: header.column.getSize() }} // Allows column widths to be set based on invidual column sizes from above
                      >
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
        placeholder={`filter here...`}
        className="p-1 border rounded w-full text-xs placeholder-italic placeholder-gray-200 placeholder-text-xs"
      />
    );
  }
  