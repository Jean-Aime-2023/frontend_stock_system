interface Product {
    name: string;
    quantity: number;
    unitPrice: number;
  }
  
  interface ManagerInfo {
    fullName: string;
    contacts: string;
  }
  
  interface DetailedManager {
    id: number;
    fullName: string;
    contacts: string;
    startingDate: string;
    status: 'Active' | 'Deactivated';
    products: Product[];
    image: string;
    managerInfo: ManagerInfo;
  }
  
  export const detailedManagers: DetailedManager[] = [
    {
      id: 1,
      fullName: 'John Doe',
      contacts: '+123456789',
      startingDate: '2022-01-15',
      status: 'Active',
      products: [
        {
          name: 'Product A',
          quantity: 100,
          unitPrice: 15.99,
        },
        {
          name: 'Product B',
          quantity: 200,
          unitPrice: 9.99,
        },
      ],
      image: 'https://via.placeholder.com/150',
      managerInfo: {
        fullName: 'John Doe',
        contacts: '+123456789',
      },
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      contacts: '+987654321',
      startingDate: '2021-07-22',
      status: 'Deactivated',
      products: [
        {
          name: 'Product C',
          quantity: 50,
          unitPrice: 25.99,
        },
        {
          name: 'Product D',
          quantity: 30,
          unitPrice: 20.99,
        },
      ],
      image: 'https://via.placeholder.com/150',
      managerInfo: {
        fullName: 'Jane Smith',
        contacts: '+987654321',
      },
    },
    {
      id: 3,
      fullName: 'Mark Johnson',
      contacts: '+1122334455',
      startingDate: '2020-03-10',
      status: 'Active',
      products: [
        {
          name: 'Product E',
          quantity: 10,
          unitPrice: 40.00,
        },
        {
          name: 'Product F',
          quantity: 80,
          unitPrice: 18.50,
        },
      ],
      image: 'https://via.placeholder.com/150',
      managerInfo: {
        fullName: 'Mark Johnson',
        contacts: '+1122334455',
      },
    },
    {
      id: 4,
      fullName: 'Emily Davis',
      contacts: '+5566778899',
      startingDate: '2023-06-05',
      status: 'Active',
      products: [
        {
          name: 'Product G',
          quantity: 150,
          unitPrice: 12.50,
        },
        {
          name: 'Product H',
          quantity: 70,
          unitPrice: 30.75,
        },
      ],
      image: 'https://via.placeholder.com/150',
      managerInfo: {
        fullName: 'Emily Davis',
        contacts: '+5566778899',
      },
    },
  ];
  