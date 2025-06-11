// DataTable_Simple.jsx
// Component just for the data table, columns, search, and filter functionality. Data component is separate in Data.jsx

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
  } from '@tanstack/react-table';
  import { useState, useMemo, memo } from 'react';
  import Tippy from '@tippyjs/react'; // For the tooltips on the column headers
  import 'tippy.js/dist/tippy.css'; // Optional styling
  
  const DataTable = memo(function DataTable({ data }) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);
    
    // Memoize the data to prevent unnecessary re-renders
    const memoizedData = useMemo(() => data, [data]);
  
    // Define the columns and column configurations for the table
    const columns = useMemo(() => [
        {
          accessorKey: 'company_name',
          header: () => (
            <div className="flex items-start justify-between gap-1 select-none w-full">
            <span className="truncate">
            Company Name 
            <br></br>
            <br></br>
            </span>
            </div>
          ),
          enableResizing: false,
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
          <div className="flex items-start justify-between gap-1 cursor-help select-none w-full">
          <span className="truncate">
          Company <br></br> Headquarters <br></br> 
          </span>
          <Tippy
            content={
            <span style={{fontSize: '0.75rem', fontWeight: 200}}>
            Primary headquarters of the company. This is not necessarily the same as where data workers are located.
            </span>
            }
            delay={[0, 0]}
            placement="top"
          >
            <span className="text-gray-500 text-sm">i</span>
          </Tippy>
          </div>
          ),
          enableResizing: false,
          filterFn: 'includesString',
        },
        {
          accessorKey: 'company_type',
          header: () => (
          <div className="flex items-start justify-between gap-1 cursor-help select-none w-full">
          <span className="truncate">
          Company <br></br> Type  <br></br>
          </span>
          <Tippy
            content={
              <span style={{fontSize: '0.75rem', fontWeight: 200}}>
              Categorization of companies based on the primary products and services they offer. See methods page for more details.
              </span>
            }
            delay={[0, 0]}
            placement="top"
          >
            <span className="text-gray-500 text-sm">i</span>
          </Tippy>
          </div>
          ),
          enableResizing: false,
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
          <div className="flex items-start justify-between gap-1 cursor-help select-none w-full">
          <span className="truncate">
          Workforce <br></br> Model <br></br>
          </span>
          <Tippy
            content={
              <span style={{fontSize: '0.75rem', fontWeight: 200}}>
              A taxonomy of how workers are integrated into the AI supply chain. See methods page for more details.
              </span>
            }
            delay={[0, 0]}
            placement="top"
          >
            <span className="text-gray-500 text-sm">i</span>
          </Tippy>
          </div>
          ),
          enableResizing: false,
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
          size: 50,
          enableResizing: false,
          filterFn: 'includesString',
          header: () => (
          <div className="flex items-start justify-between gap-1 cursor-help select-none w-full">
          <span className="truncate">
          Has In-House <br></br>Marketplace?
          </span>
          <Tippy
            content={
              <span style={{fontSize: '0.75rem', fontWeight: 200}}>
            Workforce model contains internal marketplace as fully owned subsidiaries or divisions within the AI company. See methods page for more details.
              </span>
            }
            delay={[0, 0]}
            placement="top"
          >
            <span className="text-gray-500 text-sm">i</span>
          </Tippy>
          </div>
          ),
        },
        {
          accessorKey: 'in_house_marketplace_name',
          header: () => (
            <div className="flex items-start justify-between gap-1 cursor-help select-none w-full">
            <span className="truncate">
            In-House <br></br> Marketplace  Name <br></br>
            </span>
            <Tippy
              content={
                <span style={{fontSize: '0.75rem', fontWeight: 200}}>
                Name of internal workforce marketplace, if different than company name.
                </span>
              }
              delay={[0, 0]}
              placement="top"
            >
              <span className="text-gray-500 text-sm">i</span>
            </Tippy>
          </div>
          ),        
          enableResizing: false,
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
            <div className="flex items-start justify-between gap-1 cursor-help select-none w-full">
            <span className="truncate">
              Examples of Work Done <br />
              by Data Workers
            </span>
            <Tippy
              content={
              <span style={{fontSize: '0.75rem', fontWeight: 200}}>
              Examples of the type of work conducted by data workers for the company, based on our research (not necessarily exhaustive).
              </span>
              }
              delay={[0, 0]}
              placement="top"
              >
              <span className="text-gray-500 text-sm">i</span>
            </Tippy>
          </div>
          ),
          enableResizing: false,
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
            <div className="flex items-start justify-between gap-1 cursor-help select-none w-full">
            <span className="truncate">
            Known Worker <br></br> Locations <br></br>
            </span>
            <Tippy
              content={
              <span style={{fontSize: '0.75rem', fontWeight: 200}}>
              Known worker locations based on our research. Not necessarily comprehensive, as many companies employ a remote/distributed workforce.
              </span>
              }
              delay={[0, 0]}
              placement="top"
            >
              <span className="text-gray-500 text-sm">i</span>
            </Tippy>
          </div>
          ),
          enableResizing: false,
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
            <div className="flex items-start justify-between gap-1 cursor-help select-none w-full">
            <span className="truncate">
            Relevant Articles &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <br></br>
            </span>
            <Tippy
              content={
              <span style={{fontSize: '0.75rem', fontWeight: 200}}>
              A snapshot of articles of interest related to the company.
              </span>
              }
              delay={[0, 0]}
              placement="top"
            >
              <span className="text-gray-500 text-sm">i</span>
            </Tippy>
          </div>
          ),
          enableResizing: false,
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
    
    // Create the table instance using useReactTable hook
      const table = useReactTable({
        data: memoizedData,
        columns,
        enableColumnResizing: false,
        enableColumnFilters: true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { globalFilter, columnFilters },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        // Set intitial column sizes; these must match the column sizes in the column configurations above
        // The widths are currently set based on the auto-sizing that happened when the table was first rendered in my browser; sizing accomodates for the size of the text within each column
        initialState: {
          columnSizing: {
            company_name: 200,
            company_headquarters: 200,
            company_type: 182,
            workforce_model: 268,
            has_in_house_marketplace: 160,
            in_house_marketplace_name: 200,
            product_project_assisted_by_data_workers: 273,
            known_worker_locations: 200,
            articles: 377,
          }
        },
        debugTable: false,
      });   
  
    return (
      <div className="w-full p-4 ">
        {/* The margins in the div below ensure the search bar and the table are aligned and have equal margins on the left and right */}
        <div className="ml-2 mr-2">
        {/* Search bar for global filtering */}
        <input
          type="text"
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="mb-4 mt-4 p-2 border rounded w-full"
        />
        {/* Data table with filters and columns */}
        <div className="overflow-x-auto max-h-[80vh] border rounded-lg">
          <table id="myTable" className="w-full border-b-2 border-gray-400 text-xs" style={{ tableLayout: 'fixed' }}>
            <thead className="bg-gray-400">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-gray-200">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="sticky top-0 z-10 px-4 py-2 border text-left align-top whitespace-normal break-words border-gray-200 bg-gray-200"
                      style={{ width: header.getSize() }}
                    >
                      <div className="flex flex-col justify-between h-full">
                        {flexRender(header.column.columnDef.header, header.getContext())}
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
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    );
  });


  // Filter function: includes filter options for string search and single-select dropdowns
  // This is not memoized; if memoized, it causes issues for the string/text filters
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

  export default DataTable;
  