import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

type ColumnFiltersState = Array<{ id: string; value: unknown }>;
type SortingState = Array<{ id: string; desc: boolean }>;
type VisibilityState = Record<string, boolean>;
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  filterable?: boolean;
  accessor?: (row: T) => string | number;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  pageSize?: number;
  searchPlaceholder?: string;
  searchable?: boolean;
  emptyMessage?: string;
  className?: string;
}

function getCell<T>(row: T, col: DataTableColumn<T>): string | number {
  if (col.accessor) return col.accessor(row);
  const v = (row as Record<string, unknown>)[col.key as string];
  return v == null ? '' : (v as string | number);
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  pageSize = 10,
  searchPlaceholder = 'Search...',
  searchable = true,
  emptyMessage = 'No results found.',
  className,
}: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const filterableCols = columns.filter((c) => c.filterable);

  // Distinct values per filterable column
  const filterOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const col of filterableCols) {
      const vals = Array.from(new Set(data.map((r) => String(getCell(r, col))))).sort();
      map[col.key as string] = vals;
    }
    return map;
  }, [data, filterableCols]);

  // Convert DataTableColumn[] to TanStack ColumnDef[]
  const tanstackColumns = useMemo<ColumnDef<T, any>[]>(
    () =>
      columns.map((col) => ({
        id: col.key as string,
        accessorFn: (row: T) => getCell(row, col),
        header: col.header,
        cell: ({ row }: { row: { original: T } }) => (col.render ? col.render(row.original) : String(getCell(row.original, col))),
        enableSorting: true,
        enableColumnFilter: col.filterable ?? false,
      })),
    [columns],
  );

  const table = useReactTable({
    data,
    columns: tanstackColumns,
    state: {
      globalFilter,
      columnFilters,
      sorting,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
        pageIndex: 0,
      },
    },
  });

  const handleFilterChange = (columnId: string, value: string) => {
    table.getColumn(columnId)?.setFilterValue(value || undefined);
  };

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();
  const filteredRows = table.getFilteredRowModel().rows;
  const pageRows = table.getRowModel().rows;
  const start = currentPage * pageSize;

  return (
    <div className={cn('w-full', className)}>
      {(searchable || filterableCols.length > 0) && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {searchable && (
            <input
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={searchPlaceholder}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          )}
          {filterableCols.map((col) => {
            const columnId = col.key as string;
            const currentValue = (table.getColumn(columnId)?.getFilterValue() as string) ?? '';
            return (
              <select
                key={columnId}
                value={currentValue}
                onChange={(e) => handleFilterChange(columnId, e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">{col.header}: All</option>
                {filterOptions[columnId].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            );
          })}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 font-semibold">
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          'flex items-center gap-2',
                          header.column.getCanSort() && 'cursor-pointer select-none',
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="text-muted-foreground">
                            {header.column.getIsSorted() === 'asc' ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronsUpDown className="h-4 w-4 opacity-50" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-foreground">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {filteredRows.length === 0
            ? '0 results'
            : `Showing ${start + 1}–${Math.min(start + pageSize, filteredRows.length)} of ${filteredRows.length}`}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-md border border-input bg-background px-3 py-1.5 font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-md border border-input bg-background px-3 py-1.5 font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
