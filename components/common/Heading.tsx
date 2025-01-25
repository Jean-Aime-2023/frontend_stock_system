'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CircleUser,
  LayoutDashboard,
  LineChart,
  ListOrderedIcon,
  LogOut,
  Menu,
  Package,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MdLock } from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import AdminSearch from '@/components/common/admin-search';
import Logo from '@/public/assets/Logo';
import { FaBell } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { FaAngleDown } from 'react-icons/fa6';

const Heading = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  const getActiveClass = (path: string) =>
    pathname === path
      ? 'bg-blue text-white'
      : 'text-muted-foreground hover:bg-blue/80 hover:text-white hover:transition-colors duration-200';

  const handleLinkClick = () => {
    setSheetOpen(false);
  };

  const [position, setPosition] = useState('bottom');

  return (
    <header className="flex h-16 items-center gap-4 bg-white bg-muted/40 px-4 lg:h-[80px] lg:px-6 border-b border-b-[#E1E1E1]">
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5 text-black" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-white">
          <SheetTitle>
            <Link
              href="/stock"
              className="flex items-center gap-3 text-lg font-semibold mb-5"
              onClick={handleLinkClick} // Close sheet on click
            >
              <Logo height="50" width="50" />
              <span>STOCK</span>
            </Link>
          </SheetTitle>
          <nav className="grid text-base font-medium text-white p-4 gap-3">
            <Link
              href="/stock"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-3 ${getActiveClass(
                '/stock'
              )}`}
              onClick={handleLinkClick}
            >
              <LayoutDashboard className="h-5 w-5" />
              Stock
            </Link>
            <Link
              href="/orders"
              className={`mx-[-0.65rem] flex justify-between items-center gap-4 rounded-xl px-3 py-3 ${getActiveClass(
                '/orders'
              )}`}
              onClick={handleLinkClick}
            >
              <span className="flex flex-row gap-2 items-center">
                <Package className="h-5 w-5" />
                Orders
              </span>
              <MdLock />
            </Link>
            <Link
              href="/suppliers"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-3 ${getActiveClass(
                '/suppliers'
              )}`}
              onClick={handleLinkClick}
            >
              <Package className="h-5 w-5" />
              Suppliers
            </Link>
            <Link
              href="/sections"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-3 ${getActiveClass(
                '/sections'
              )}`}
              onClick={handleLinkClick}
            >
              <ListOrderedIcon className="h-5 w-5" />
              Sections
            </Link>
            <Link
              href="/reports"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-3 ${getActiveClass(
                '/reports'
              )}`}
              onClick={handleLinkClick}
            >
              <LineChart className="h-5 w-5" />
              Reports
            </Link>
          </nav>
          <div className="mt-auto">
            <nav className="grid gap-3 items-start text-base px-2 font-medium lg:px-4 text-white">
              <Link
                href="/settings"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${getActiveClass(
                  '/settings'
                )}`}
                onClick={handleLinkClick}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
              <Link
                href="/login"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${getActiveClass(
                  '/login'
                )}`}
                onClick={handleLinkClick}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <AdminSearch />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-5 max-md:px-2 max-md:rounded-full outline-none rounded-xl py-2 border text-sm">
            <span className="max-lg:hidden">Start Action</span>
            <FaAngleDown />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">New List</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              Entrance
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">
              Continue
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="relative cursor-pointer">
        <FaBell size={22} />
        <GoDotFill color="red" className="absolute -top-1 -right-1" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full p-0">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={'/admin/settings'}>My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={'/sign-in'}>Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Heading;
