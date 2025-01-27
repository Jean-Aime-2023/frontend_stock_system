/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { MdAdd } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { detailedManagers, DetailedManager } from '@/data/Managers';

export const columns: ColumnDef<DetailedManager>[] = [
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
    accessorKey: 'fullName',
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Manager Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue('fullName')}</span>,
  },
  {
    accessorKey: 'contacts',
    header: 'Contacts',
    cell: ({ row }) => <span>{row.getValue('contacts')}</span>,
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Actions',
    cell: ({ row }) => {
      const managerId = row.original.id;
      return (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <div
                className="cursor-pointer bg-[#E91A1A] rounded hover:bg-[#c73535] p-2 text-white hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <FaRegTrashAlt color="white" />
              </div>
            </DialogTrigger>

            <DialogContent onClick={(e) => e.stopPropagation()} className="p-9 flex-col gap-4">
              <DialogHeader className="flex-col gap-4">
                <DialogTitle>Confirm delete</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  manager. Enter your{' '}
                  <span className="font-semibold">username</span> to confirm.
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
        </div>
      );
    },
  },
];

export function ManagersTable() {
  const router = useRouter();

  const navigateToManagerDetails = (id: number) => {
    router.push(`/managers/${id}`);
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: detailedManagers,
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
          placeholder="Filter supplier..."
          value={
            (table.getColumn('fullName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('fullName')?.setFilterValue(event.target.value)
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
          <Button
            variant="outline"
            className="ml-auto bg-blue text-white hover:bg-blue/50 transition"
            onClick={() => router.push('/managers/new')}
          >
            <MdAdd />
            Add supplier
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
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => navigateToManagerDetails(row.original.id)}
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
  );
}
