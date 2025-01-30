'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { GoDotFill } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FaRegTrashAlt } from 'react-icons/fa';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Stock, tableData } from '@/data/Stock';
import { MdAdd } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export const columns: ColumnDef<Stock>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Product Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    cell: ({ row }) => <span>{row.getValue('supplier')}</span>,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => <span>{row.getValue('quantity')}</span>,
  },
  {
    accessorKey: 'price',
    header: 'Unit Price(FRW)',
    cell: ({ row }) => {
      const price = row.getValue<number>('price');
      return <span>{new Intl.NumberFormat('en-US').format(price)}</span>;
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => (
      <span className="px-2 py-1 bg-[#ECFDF3] text-[#037847] flex w-fit flex-row gap-1 items-center rounded-full">
        <GoDotFill color="#14BA6D" />
        {row.getValue('stock')}
      </span>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;

      const statusStyles: Record<string, string> = {
        enough: 'text-[#2AD300] bg-[#EBFFE8]',
        insufficient: 'text-[#FFB800] bg-[#FFE8CC]',
        'out of stock': 'text-[#E91A1A] bg-[#FFE8E8]',
      };

      return (
        <span
          className={`px-2 py-1 rounded-md text-sm capitalize ${
            statusStyles[status] || ''
          }`}
        >
          {status}
        </span>
      );
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    header: 'Actions',
    cell: () => {
      return ( 
        <Dialog>
          <DialogTrigger onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 bg-[#E91A1A] rounded hover:bg-[#c73535] p-2 text-white hover:text-white">
              <FaRegTrashAlt color="white" />
            </div>
          </DialogTrigger>

          <DialogContent onClick={(e) => e.stopPropagation()} className="p-9 flex-col gap-4">
            <DialogHeader className="flex-col gap-4">
              <DialogTitle>Confirm delete</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this
                stock ? Enter your{' '}
                <span className="font-semibold">username</span> to delete
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="eg: John"
                className="px-4 py-3 rounded-[12px] placeholder-[#6B6B6B] bg-[#F5F5F5] outline-none"
              />
              <div className="flex flex-row gap-4 items-center">
                <Button className="bg-[#E91A1A] hover:bg-[#c73535] p-2 px-3 text-white">
                  Delete
                </Button>
                <Button className="text-black border border-[#D0D5DD] bg-transparent hover:bg-transparent p-2 px-3">
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export function StockTable() {
  const router = useRouter();

  const navigateToManagerDetails = (id: unknown) => {
    router.push(`/stock/products/${id}`);
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-3 rounded-xl bg-white border shadow-md">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter product..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="ml-auto">
            <IoCloudDownloadOutline />
            Export
          </Button>
          <Button
            onClick={() => router.push('/stock/products/new')}
            variant="outline"
            className="ml-auto bg-blue border-none hover:bg-blue/80 text-white hover:text-white"
          >
            <MdAdd />
            Add product
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#FCFCFD]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => navigateToManagerDetails(row.original.id)}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
