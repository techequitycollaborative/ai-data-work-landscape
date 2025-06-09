// DataTable.jsx


import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
  } from '@tanstack/react-table';
  import { useState, useMemo } from 'react';
  
  export default function DataTable({ data }) {
    // Log the data to console for debugging
    console.log("Data received by DataTable:", data);

    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);
  
    const columns = useMemo(() => [
      {
        accessorKey: 'company_name',
        header: () => (
          <div
          title="Current name of the company."
          className="flex items-center gap-1 cursor-help whitespace-normal break-words block truncate select-none justify-between items-start"
        >
          Company <br></br> Name <br></br> 
          <span className="text-gray-500 whitespace-normal break-words">i</span>
        </div>
        ),
        size: 50, // set custom width of the column
        filterFn: 'includesString',
        cell: info => {
          const row = info.row.original;
          return (
            <a
              href={row.company_website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline whitespace-normal break-words"
            >
              {info.getValue()}
            </a>
          );
        },
      },
      {
        accessorKey: 'company_headquarters',
        header: () => (
          <div
          title="Primary location(s) of the company headquarters, which may not be where data workers are based."
          className="flex items-center gap-1 cursor-help whitespace-normal break-words block truncate select-none justify-between items-start"
        >
          Company <br></br> Headquarters <br></br> 
          <span className="text-gray-500 whitespace-normal break-words">i</span>
        </div>
        ),
        size: 50, // set custom width of the column
        filterFn: 'includesString',
      },
      {
        accessorKey: 'company_type',
        header: () => (
          <div
          title="Type of company defined by the primary products and services it offers (i.e., tools, workforce, or both)"
          className="flex items-center gap-1 cursor-help whitespace-normal break-words block truncate select-none justify-between items-start"
        >
          Company <br></br> Type  <br></br>
          <span className="text-gray-500 whitespace-normal break-words">i</span>
        </div>
        ),
        size: 50, // set custom width of the column
        filterFn: 'equals',
        meta: { filterType: 'select' },
        cell: info => {
          const value = info.getValue();
          let className = "";
      
          if (value === "Tools") {
            className = "bg-[#ade4d1] text-black px-2 py-1 rounded-lg";
          } else if (value === "Workforce") {
            className = "bg-[#cde1f9] text-black px-2 py-1 rounded-lg";
          } else if (value === "Tools + workforce") {
            className = "bg-[#f6d7ff] text-black px-2 py-1 rounded-lg";
          }
      
          return <span className={`text-xs flex flex-wrap gap-1 ${className}`}>{value}</span>;
        }
      },
      {
        accessorKey: 'workforce_model',
        header: () => (
          <div
          title="The type of labor structure the company uses (e.g., contractor, marketplace, BPO)"
          className="flex items-center gap-1 cursor-help select-none block truncate justify-between items-start"
        >
          Workforce <br></br> Model <br></br>
          <span className="text-gray-500 whitespace-normal break-words">i</span>
        </div>
        ),
        size: 100, // set custom width of the column
        filterFn: 'includesString',
        cell: info => {
          const value = info.getValue() || "";
          const keywords = [
            {
              match: "Marketplace Model",
              style: "bg-[#00495e] text-white px-2 py-1 rounded-lg",
            },
            {
              match: "BPO model",
              style: "bg-[#712f39] text-white px-2 py-1 rounded-lg",
            },
            {
              match: "Unclear",
              style: "bg-[#444716] text-white px-2 py-1 rounded-lg",
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
        size: 50, // set custom width of the column
        filterFn: 'includesString',
        header: () => (
          <div
          title="Does the company have in-house subsidiary marketplaces for data work? (i.e., Scale AI has Outlier and Remotasks)"
          className="flex items-center gap-1 cursor-help select-none block truncate justify-between items-start"
        >
          Has In-House <br></br>Marketplace?
          <span className="text-gray-500 whitespace-normal break-words">i</span>
        </div>
        ),
      },
      {
        accessorKey: 'in_house_marketplace_name',
        header: () => (
          <div
          title="Name of company's in-house marketplace(s)"
          className="flex items-center gap-1 cursor-help select-none  block truncate justify-between items-start"
        >
          In-House <br></br> Marketplace  Name <br></br>
          <span className="text-gray-500 whitespace-normal break-words">i</span>
        </div>
        ),        
        size: 50, // set custom width of the column
        filterFn: 'includesString',
        cell: info => {
          const row = info.row.original;
          return (
            <a
              href={row.in_house_marketplace_website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline whitespace-normal break-words"
            >
              {info.getValue()}
            </a>
          );
        },
      },
      {
        accessorKey: 'product_project_assisted_by_data_workers',
        header: () => (
          <div
          title="Examples of the type of work data workers do for the company (e.g., data collection, annotation, model training)"
          className="flex items-center gap-1 cursor-help select-none block truncate justify-between items-start"
        >
          Examples of Work Done <br></br> by Data Workers &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<br></br>
          <span className="text-gray-500 whitespace-normal break-words">i</span>
        </div>
        ),
        size: 200, // set custom width of the column
        filterFn: 'includesString',
        cell: info => {
          const value = info.getValue() || "";
          return (
            <span className="text-xs text-gray-700 whitespace-normal break-words">
              {value}
            </span>
          );
        }
      },
      {
        accessorKey: 'known_worker_locations',
        header: () => (
          <div
          title="Known locations where data workers for this company are based. Not exhaustive."
          className="flex items-center gap-1 cursor-help select-none block truncate justify-between items-start"
        >
          Known Worker <br></br> Locations <br></br>
          <span className="text-gray-500 whitespace-normal break-words">i</span>
        </div>
        ),
        size: 50, // set custom width of the column
        filterFn: 'includesString',
        cell: info => { 
          const value = info.getValue() || "";
          return (
            <span className="text-xs text-gray-700 whitespace-normal break-words">
              {value}
            </span>
          );
        }
      },
      {
        id: 'articles',
        header: () => (
          <div
          title="Key articles found during our research. Not exhaustive."
          className="flex items-center gap-1 cursor-help select-none block truncate justify-between items-start"
        >
          Relevant Articles &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <br></br>
          <span className="text-gray-500 whitespace-normal break-words">i</span>
          </div>
        ),
        size: 100, // set custom width of the column
        filterFn: 'includesString',
        cell: info => {
          const row = info.row.original;
          const articles = [];
        
          for (let i = 1; i <= 5; i++) {
            const title = row[`article_${i}_title`];
            const link = row[`article_${i}_link`];
        
            if (title && link) {
              articles.push(
                <div key={i} className="mb-2 mr-10">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-xs block truncate max-w-xs hover:text-blue-700"
                  >
                    {title}
                  </a>
                </div>
              );
            }
          }
        
          return (
            <span className="text-xs text-gray-700 whitespace-normal break-words">
              {articles}
            </span>
          );
        }
      },
    ], []);
  
    const table = useReactTable({
      data,
      columns,
      columnResizeMode: 'onChange', // or 'onEnd'
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { globalFilter, columnFilters },
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      debugTable: false,
    });
    
  
    return (
      <div className="w-full p-4">
        {/* Global Search */}
        <input
          type="text"
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="mb-4 mt-4 p-2 border rounded w-full"
        />
  
        <div className="overflow-x-auto max-h-[80vh] border rounded-lg">
          {/* min-w-full wraps the column width. min-w-max extends the column width. */}
          <table 
            id="myTable"
            className="min-w-full table-auto border-b-2 border-gray-400 text-xs"
            > 
            <thead className="bg-gray-400">
              {table.getHeaderGroups().map(headerGroup => (
                <tr 
                  key={headerGroup.id}
                  className='border-b border-gray-200'
                  >
                  {headerGroup.headers.map(header => (
                    <th key={header.id} 
                      colSpan={header.colSpan}
                      className="sticky top-0 z-10 px-4 py-2 border text-left align-top whitespace-normal break-words border border-gray-200 bg-gray-200"
                      style={{ width: header.column.getSize() }} // Allows column widths to be set based on invidual column sizes from above
                      >
                      <div className="flex flex-col justify-between h-full">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() && (
                        <div className="mt-1">
                        <ColumnFilter column={header.column} data={data} />
                        </div>
                      )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="even:bg-gray-50">
                    {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="p-2 text-xs border-b-2 border-r border-gray-200 align-top"
                      style={{ minWidth: cell.column.getSize() }}
                    >
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
  
  // Filter function: includes filter options for string search and single-select dropdowns
  function ColumnFilter({ column, data }) {
    const columnFilterValue = column.getFilterValue() ?? "";
  
    // Get unique values for this column from data
    const uniqueValues = useMemo(() => {
      const accessor = column.columnDef.accessorKey;
      if (!accessor) return [];
  
      const values = new Set();
      data.forEach(row => {
        const value = row[accessor];
        if (value !== undefined && value !== null) {
          values.add(value);
        }
      });
      return Array.from(values).sort();
    }, [data, column.columnDef.accessorKey]);
  
    // Use dropdown for specific columns
    const useDropdown = ["company_type", "workforce_model", "has_in_house_marketplace"].includes(column.id);
  
    return useDropdown ? (
      <select
        value={columnFilterValue}
        onChange={(e) => column.setFilterValue(e.target.value || undefined)}
        className="p-1 mt-5 border rounded min-w-full text-xs placeholder-italic placeholder-gray-200 placeholder-text-xs" // use min-w-full so filter box takes up width of the cell
      >
        <option value="">All</option>
        {uniqueValues.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    ) : (
      <input
        type="text"
        value={columnFilterValue}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={"filter here..."}
        className="p-1 mt-5 border rounded min-w-full text-xs placeholder-italic placeholder-gray-200 placeholder-text-xs" // use min-w-full so filter box takes up width of the cell
      />
    );
  }
  