import React, { useMemo, useState } from 'react';

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  // optional custom cell renderer
  render?: (row: T) => React.ReactNode;
  // enable a value-based filter dropdown for this column
  filterable?: boolean;
  // accessor used for search + filter (defaults to row[key])
  accessor?: (row: T) => string | number;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  pageSize?: number;
  // global search placeholder
  searchPlaceholder?: string;
  // show the global search box
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
  className = '',
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);

  const filterableCols = columns.filter((c) => c.filterable);

  // distinct values per filterable column
  const filterOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const col of filterableCols) {
      const vals = Array.from(
        new Set(data.map((r) => String(getCell(r, col)))),
      ).sort();
      map[col.key as string] = vals;
    }
    return map;
  }, [data, filterableCols]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((row) => {
      if (q) {
        const hit = columns.some((c) =>
          String(getCell(row, c)).toLowerCase().includes(q),
        );
        if (!hit) return false;
      }
      for (const col of filterableCols) {
        const fv = filters[col.key as string];
        if (fv && String(getCell(row, col)) !== fv) return false;
      }
      return true;
    });
  }, [data, query, filters, columns, filterableCols]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const start = safePage * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  const setFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  return (
    <div className={['w-full', className].join(' ')}>
      {(searchable || filterableCols.length > 0) && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {searchable && (
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder={searchPlaceholder}
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
            />
          )}
          {filterableCols.map((col) => (
            <select
              key={col.key as string}
              value={filters[col.key as string] ?? ''}
              onChange={(e) => setFilter(col.key as string, e.target.value)}
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
            >
              <option value="">{col.header}: All</option>
              {filterOptions[col.key as string].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr>
              {columns.map((col) => (
                <th key={col.key as string} className="px-4 py-3 font-semibold">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-neutral-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} className="hover:bg-neutral-50">
                  {columns.map((col) => (
                    <td key={col.key as string} className="px-4 py-3 text-neutral-800">
                      {col.render ? col.render(row) : String(getCell(row, col))}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-neutral-500">
        <span>
          {filtered.length === 0
            ? '0 results'
            : `Showing ${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length}`}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            className="rounded-md border border-neutral-300 px-3 py-1.5 font-medium text-neutral-700 disabled:opacity-40 hover:bg-neutral-50"
          >
            Prev
          </button>
          <span>
            Page {safePage + 1} / {pageCount}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={safePage >= pageCount - 1}
            className="rounded-md border border-neutral-300 px-3 py-1.5 font-medium text-neutral-700 disabled:opacity-40 hover:bg-neutral-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
