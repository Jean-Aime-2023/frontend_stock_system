'use client';
import Input from '@/components/common/Input';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const EditProduct = () => {
  const router = useRouter();

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [threshold, setThreshold] = useState('');
  const [section, setSection] = useState('');

  const [suppliers, setSuppliers] = useState<string[]>([
    'Eri Rwanda',
    'Musenge',
  ]);

  const [newSupplier, setNewSupplier] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRemoveSupplier = (supplier: string) => {
    setSuppliers(suppliers.filter((s) => s !== supplier));
  };

  const handleAddSupplier = () => {
    if (newSupplier.trim() && !suppliers.includes(newSupplier.trim())) {
      setSuppliers([...suppliers, newSupplier.trim()]);
      setNewSupplier('');
      setIsDialogOpen(false);
    }
  };
  const handleChangeProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleChangeThreshold = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold(e.target.value);
  };

  const handleChangeSection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSection(e.target.value);
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white w-[80%] flex flex-col gap-6 rounded-[20px] p-10 px-[8rem]">
        <div>
          <h1 className="text-[24px] font-semibold">Edit Product Details</h1>
          <p className="text-[#667085] py-2">
            Change different details about a product, the one provided are the
            initial set details.
          </p>
        </div>
        <form>
          <div className="flex flex-row gap-6 items-center">
            <Input
              label="Product Name"
              name="productName"
              required
              placeholder="e.g., Rice"
              value={productName}
              onChange={handleChangeProductName}
            />
            <p className="text-[#667085] w-[24%] text-[14px]">
              This is for the name of the product that you are entering
            </p>
          </div>
          <div className="flex flex-row gap-6 items-center">
            <Input
              label="Count / Quantity"
              name="quantity"
              required
              placeholder="e.g., 50"
              type="number"
              value={quantity}
              onChange={handleChangeQuantity}
            />
            <p className="text-[#667085] w-[24%] text-[14px]">
              The number of products you are entering in stock
            </p>
          </div>
          <div className="flex flex-row gap-6 items-center">
            <Input
              label="Entry Unit Price"
              name="quantity"
              required
              placeholder="eg: 3,200"
              type="number"
              value={quantity}
              onChange={handleChangeQuantity}
            />
            <p className="text-[#667085] w-[24%] text-[14px]">
              This is the price per each product that you entered on your latest
              entry
            </p>
          </div>
          <div className="flex flex-row gap-6 items-center">
            <Input
              label="Threshold Value"
              name="threshold"
              required
              placeholder="e.g., 10"
              type="number"
              value={threshold}
              onChange={handleChangeThreshold}
            />
            <p className="text-[#667085] w-[24%] text-[14px]">
              This is the number of products that indicate that product is
              insufficient
            </p>
          </div>
          <div className="flex flex-row gap-6 items-center">
            <Input
              label="Current Stock"
              name="threshold"
              required
              placeholder="eg: 3,200"
              type="number"
              value={threshold}
              onChange={handleChangeThreshold}
            />
            <p className="text-[#667085] w-[24%] text-[14px]">
              This is the number of products you have now in your stock
            </p>
          </div>
          <div className="flex flex-row gap-6 items-center">
            <Input
              label="Section / Stock"
              name="section"
              required
              placeholder="e.g., Warehouse A"
              value={section}
              onChange={handleChangeSection}
            />
            <p className="text-[#667085] w-[24%] text-[14px]">
              This is the provider of that product.
            </p>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Suppliers <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-row gap-6 items-center">
              <div className="flex flex-1 flex-wrap gap-2 bg-[#F4F4F4] border-[2px] border-gray-200 p-4 py-2 rounded-[10px]">
                {suppliers.map((supplier, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-full shadow-sm"
                  >
                    <span className="text-sm text-gray-700">{supplier}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSupplier(supplier)}
                      className="ml-2 text-red-500 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[#667085] w-[24%] text-[14px]">
                This is the stock that the product is stored in or if you use
                sections you have to put in sections that you want
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="mt-4 bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue/50"
                >
                  Add New Supplier
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Supplier</DialogTitle>
                  <DialogDescription>
                    Enter the name of the new supplier below and click
                    &quot;Add&quot;.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <input
                    type="text"
                    value={newSupplier}
                    onChange={(e) => setNewSupplier(e.target.value)}
                    placeholder="Supplier name"
                    className="w-full py-3 px-4 rounded-lg border border-gray-300"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    onClick={handleAddSupplier}
                    className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue/50"
                  >
                    Add Supplier
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              router.push('/stock');
            }}
            className="max-lg:w-full w-[75%] py-3 mt-6 bg-blue text-white rounded-lg hover:bg-blue/50 transition"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
