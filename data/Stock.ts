export type Stock = {
  id: string;
  name: string;
  supplier: string;
  quantity: number;
  stock:string,
  price: number;
  date: Date;
  status: 'enough' | 'insufficient' | 'out of stock';
};

export const tableData: Stock[] = [
  {
    id: '12412njk',
    name: 'shoes',
    supplier: 'Eri Rwanda',
    quantity: 500,
    price: 21500,
    date: new Date('2022-03-01'),
    status: 'enough',
    stock:'Kwa Kazungu'
  },
  {
    id: 'jku2b34k',
    name: 'jackets',
    supplier: 'TopApparel Ltd',
    quantity: 300,
    price: 45000,
    date: new Date('2022-06-15'),
    status: 'enough',
    stock:'Kwa Kazungu'
  },
  {
    id: 'abk124lq',
    name: 'bags',
    supplier: 'Global Gear',
    quantity: 120,
    price: 18000,
    date: new Date('2023-01-20'),
    status: 'insufficient',
    stock:'Kwa Kazungu'
  },
  {
    id: 'xlq320kl',
    name: 'hats',
    supplier: 'CapMakers Inc',
    quantity: 220,
    price: 5000,
    date: new Date('2023-02-12'),
    status: 'out of stock',
    stock:'Kwa Kazungu'
  },
  {
    id: 'qwe112op',
    name: 'socks',
    supplier: 'FootFinesse',
    quantity: 1000,
    price: 1200,
    date: new Date('2023-03-05'),
    status: 'out of stock',
    stock:'Kwa Kazungu'
  },
  {
    id: 'poi323ml',
    name: 'belts',
    supplier: 'LeatherWorks',
    quantity: 150,
    price: 8000,
    date: new Date('2023-04-10'),
    status: 'enough',
    stock:'Kwa Kazungu'
  },
  {
    id: 'alk923od',
    name: 'jeans',
    supplier: 'DenimWorld',
    quantity: 600,
    price: 35000,
    date: new Date('2023-05-30'),
    status: 'insufficient',
    stock:'Kwa Kazungu'
  },
  {
    id: 'nxp789bn',
    name: 't-shirts',
    supplier: 'PrintPerfect',
    quantity: 1200,
    price: 9000,
    date: new Date('2023-07-01'),
    status: 'out of stock',
    stock:'Kwa Kazungu'
  },
  {
    id: 'wer34vdx',
    name: 'scarves',
    supplier: 'SoftStyle',
    quantity: 400,
    price: 2500,
    date: new Date('2023-07-15'),
    status: 'enough',
    stock:'Kwa Kazungu'
  },
  {
    id: 'asd12kjl',
    name: 'gloves',
    supplier: 'WarmHands Co',
    quantity: 800,
    price: 6000,
    date: new Date('2023-08-08'),
    status: 'out of stock',
    stock:'Kwa Kazungu'
  },
  {
    id: 'bvc23epr',
    name: 'sweaters',
    supplier: 'CozyWear',
    quantity: 300,
    price: 30000,
    date: new Date('2023-09-01'),
    status: 'enough',
    stock:'Kwa Kazungu'
  },
  {
    id: 'mvf12r8n',
    name: 'shorts',
    supplier: 'ActiveLine',
    quantity: 700,
    price: 14000,
    date: new Date('2023-09-10'),
    status: 'enough',
    stock:'Kwa Kazungu'
  },
  {
    id: 'xlr789qw',
    name: 'raincoats',
    supplier: 'RainyDay Supplies',
    quantity: 250,
    price: 50000,
    date: new Date('2023-10-01'),
    status: 'insufficient',
    stock:'Kwa Kazungu'
  },
  {
    id: 'poi238dk',
    name: 'sandals',
    supplier: 'SummerStep',
    quantity: 400,
    price: 18000,
    date: new Date('2023-10-15'),
    status: 'enough',
    stock:'Kwa Kazungu'
  },
  {
    id: 'kjd892na',
    name: 'caps',
    supplier: 'UrbanHeadwear',
    quantity: 500,
    price: 3000,
    date: new Date('2023-11-05'),
    status: 'insufficient',
    stock:'Kwa Kazungu'
  },
  {
    id: 'nmc92lak',
    name: 'boots',
    supplier: 'MountainGear',
    quantity: 350,
    price: 70000,
    date: new Date('2023-12-01'),
    status: 'out of stock',
    stock:'Kwa Kazungu'
  },
];
