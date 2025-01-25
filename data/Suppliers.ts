export type StockDetail = {
    latestQuantity: number;
    latestUnitPrice: number; 
    stockName: string;
    latestSupplyDate: string; 
    productName:string;
    status: 'enough' | 'insufficient' | 'out of stock'; 
  };
  
  export type Supplier = {
    id: number; 
    name: string;
    contact: string; 
    stockDetails: StockDetail[];
  };
  
  export const suppliers: Supplier[] = [
    {
      id: 1, 
      name: "Supplier 1",
      contact: "+250 123 456 789",
      stockDetails: [
        {
          latestQuantity: 100,
          latestUnitPrice: 5000, 
          stockName: "Stock A",
          productName:'Shoes',
          latestSupplyDate: "2025-01-10",
          status: "enough",
        },
        {
          latestQuantity: 50,
          latestUnitPrice: 4500, 
          stockName: "Stock B",
          productName:'Rice',
          latestSupplyDate: "2025-01-05",
          status: "insufficient",
        },
      ],
    },
    {
      id: 2, 
      name: "Supplier 2",
      contact: "+250 987 654 321",
      stockDetails: [
        {
          latestQuantity: 200,
          latestUnitPrice: 7000, 
          stockName: "Stock C",
          productName:'Pants',
          latestSupplyDate: "2025-01-12",
          status: "enough",
        },
      ],
    },
  ];
  