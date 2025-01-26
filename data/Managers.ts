// import img1 from '@/public/assets/img.jpg'
// import img2 from '@/public/assets/img2.jpg'
// import img3 from '@/public/assets/img3.jpg'

export interface Product {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  productDate: string;
}

export interface ManagerInfo {
  fullName: string;
  contacts: string;
}

export interface DetailedManager {
  id: number;
  fullName: string;
  contacts: string;
  startingDate: string;
  status: 'Active' | 'Deactivated';
  products: Product[];
  image: string;
  email: string;
  stockName: string;
  managerInfo: ManagerInfo;
}

export const detailedManagers: DetailedManager[] = [
  {
    id: 1,
    fullName: 'John Doe',
    contacts: '+123456789',
    startingDate: '2022-01-15',
    status: 'Active',
    stockName: 'Kwa Farawo',
    email: 'farao@gmail.com',
    products: [
      {
        id: 1,
        name: 'Product A',
        quantity: 100,
        unitPrice: 15.99,
        productDate: '2022-01-15',
      },
      {
        id: 2,
        name: 'Product B',
        quantity: 200,
        unitPrice: 9.99,
        productDate: '2022-01-15',
      },
    ],
    image: '/assets/img2.jpg',
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
    stockName: 'Kwa Farawo',
    email: 'farao@gmail.com',
    products: [
      {
        id: 1,
        name: 'Product C',
        quantity: 50,
        unitPrice: 25.99,
        productDate: '2022-01-15',
      },
      {
        id: 2,
        name: 'Product D',
        quantity: 30,
        unitPrice: 20.99,
        productDate: '2022-01-15',
      },
    ],
    image: '/assets/img.jpg',
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
    stockName: 'Kwa Farawo',
    status: 'Active',
    email: 'farao@gmail.com',
    products: [
      {
        id: 1,
        name: 'Product E',
        quantity: 10,
        unitPrice: 40.0,
        productDate: '2022-01-15',
      },
      {
        id: 2,
        name: 'Product F',
        quantity: 80,
        unitPrice: 18.5,
        productDate: '2022-01-15',
      },
    ],
    image: '/assets/img2.jpg',
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
    stockName: 'Kwa Farawo',
    email: 'farao@gmail.com',
    products: [
      {
        id: 1,
        name: 'Product G',
        quantity: 150,
        unitPrice: 12.5,
        productDate: '2022-01-15',
      },
      {
        id: 2,
        name: 'Product H',
        quantity: 70,
        unitPrice: 30.75,
        productDate: '2022-01-15',
      },
    ],
    image: '/assets/img3.jpg',
    managerInfo: {
      fullName: 'Emily Davis',
      contacts: '+5566778899',
    },
  },
];
