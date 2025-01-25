'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  LineChart,
  LogOut,
  Package,
  Settings,
  UserRound,
  ListOrderedIcon,
} from 'lucide-react';
import Logo from '@/public/assets/Logo';
import { GoPeople } from 'react-icons/go';
import { MdLock } from 'react-icons/md';

const Sidebar = () => {
  const pathname = usePathname();

  const getActiveClass = (path: string) =>
    pathname === path
      ? 'bg-blue text-white'
      : 'text-muted-foreground hover:bg-blue/80 hover:text-white hover:transition-colors duration-200';

  return (
    <div className="hidden border-r bg-muted/40 md:block text-[#5D6679]">
      <div className="flex h-full max-h-screen flex-col gap-7 bg-white p-7 px-3">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-4">
          <Link href="/stock" className="flex items-center gap-2 font-semibold">
            <Logo height="50" width="50" />
            <span className="font-bold text-black text-xl rowdies-light">
              STOCK
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid gap-3 items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/stock"
              className={`flex items-center gap-3 rounded-[8px] px-3 py-[15px] ${getActiveClass(
                '/stock'
              )}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Stock
            </Link>
            <Link
              href="/orders"
              className={`flex items-center justify-between gap-3 rounded-[8px] px-3 py-[15px] ${getActiveClass(
                '/orders'
              )}`}
            >
              <span className='flex flex-row gap-2 items-center'>
                <Package className="h-4 w-4" />
                Orders
              </span>
              <MdLock />
            </Link>
            <Link
              href="/suppliers"
              className={`flex items-center gap-3 rounded-[8px] px-3 py-[15px] ${getActiveClass(
                '/suppliers'
              )}`}
            >
              <UserRound className="h-4 w-4" />
              Suppliers
            </Link>
            <Link
              href="/sections"
              className={`flex items-center gap-3 rounded-[8px] px-3 py-[15px] ${getActiveClass(
                '/sections'
              )}`}
            >
              <ListOrderedIcon className="h-4 w-4" />
              Sections
            </Link>
            <Link
              href="/managers"
              className={`flex items-center gap-3 rounded-[8px] px-3 py-[15px] ${getActiveClass(
                '/managers'
              )}`}
            >
              <GoPeople className="h-4 w-4" />
              Managers
            </Link>
            <Link
              href="/reports"
              className={`flex items-center gap-3 rounded-[8px] px-3 py-[15px] ${getActiveClass(
                '/reports'
              )}`}
            >
              <LineChart className="h-4 w-4" />
              Reports
            </Link>
          </nav>
        </div>
        <div className="mt-auto">
          <nav className="grid gap-3 items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/settings"
              className={`flex items-center gap-3 rounded-[8px] px-3 py-[15px] ${getActiveClass(
                '/settings'
              )}`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Link
              href="/login"
              className={`flex items-center gap-3 rounded-[8px] px-3 py-[15px] ${getActiveClass(
                '/login'
              )}`}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
