'use client';

import * as React from 'react';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaRegTrashAlt } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { suppliers, StockDetail } from '@/data/Suppliers';
import { useParams, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { GoDotFill } from 'react-icons/go';

export const columns: ColumnDef<StockDetail>[] = [
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
    accessorKey: 'productName',
    header: 'Stock Name',
    cell: ({ row }) => <span>{row.getValue('productName')}</span>,
  },
  {
    accessorKey: 'latestQuantity',
    header: 'Quantity',
    cell: ({ row }) => <span>{row.getValue('latestQuantity')}</span>,
  },
  {
    accessorKey: 'latestUnitPrice',
    header: 'Unit Price (FRW)',
    cell: ({ row }) => {
      const price = row.getValue<number>('latestUnitPrice');
      return <span>{new Intl.NumberFormat('en-US').format(price)}</span>;
    },
  },
  {
    accessorKey: 'stockName',
    header: 'Stock',
    cell: ({ row }) => (
      <span className="px-2 py-1 bg-[#ECFDF3] text-[#037847] flex w-fit flex-row gap-1 items-center rounded-full">
        <GoDotFill color="#14BA6D" />
        {row.getValue('stockName')}
      </span>
    ),
  },
  {
    accessorKey: 'latestSupplyDate',
    header: 'Last Supplied',
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>('latestSupplyDate'));
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Stock Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status');
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
    header: 'Actions',
    cell: () => {
      return (
        <Dialog>
          <DialogTrigger>
            <div className="flex-1 bg-[#E91A1A] rounded hover:bg-[#c73535] p-2 text-white hover:text-white">
              <FaRegTrashAlt color="white" />
            </div>
          </DialogTrigger>

          <DialogContent className="p-9 flex-col gap-4">
            <DialogHeader className="flex-col gap-4">
              <DialogTitle>Confirm delete</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this
                stock? Enter your{' '}
                <span className="font-semibold">username</span> to delete.
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

export default function StockTable() {
  const { id } = useParams();
  const router = useRouter();
  const supplierId = parseInt(id as string, 10);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const supplier = suppliers.find((sup) => sup.id === supplierId);

  if (!supplier) {
    return <p className="text-red-500">Supplier not found!</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const table = useReactTable({
    data: supplier.stockDetails,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter stock..."
          value={
            (table.getColumn('stockName')?.getFilterValue() as string) ?? ''
          }
          onChange={(e) =>
            table.getColumn('stockName')?.setFilterValue(e.target.value)
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
            className="ml-auto bg-red-500 border-none hover:bg-red-500/80 text-white hover:text-white"
          >
            <FaRegTrashAlt />
            Delete
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#FCFCFD]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
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
