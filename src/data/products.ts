export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  colors: string[];
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Ruby Raider Backpack',
    description:
      'Carry all the things with the sleek, streamlined Ruby Raider Backpack. Enough room for your laptop and lunch.',
    price: 29.99,
    rating: 4,
    colors: ['#000000', '#808080', '#FF0000'],
    image: '🎒',
  },
  {
    id: 2,
    name: 'Ruby Raider Bike Light',
    description:
      "A red light isn't the desired light for your bike, but it helps being seen at night.",
    price: 9.99,
    rating: 5,
    colors: ['#FF0000', '#000000'],
    image: '🔦',
  },
  {
    id: 3,
    name: 'Ruby Raider Bolt T-Shirt',
    description:
      'Get your testing superhero on with the Ruby Raider bolt T-shirt.',
    price: 15.99,
    rating: 3,
    colors: ['#000000', '#FFFFFF', '#0000FF'],
    image: '👕',
  },
  {
    id: 4,
    name: 'Ruby Raider Fleece Jacket',
    description:
      "It's not every day that you come across a mid-weight quarter-zip fleece jacket.",
    price: 49.99,
    rating: 4,
    colors: ['#808080', '#000000'],
    image: '🧥',
  },
  {
    id: 5,
    name: 'Ruby Raider Onesie',
    description:
      "Rib snap infant onesie for the junior automation engineer in development.",
    price: 7.99,
    rating: 5,
    colors: ['#FF0000', '#0000FF', '#FFFFFF'],
    image: '👶',
  },
  {
    id: 6,
    name: 'Test.allTheThings() T-Shirt',
    description:
      'This classic Ruby Raider t-shirt is perfect to wear when writing tests.',
    price: 15.99,
    rating: 4,
    colors: ['#FF0000', '#000000', '#FFFFFF'],
    image: '👔',
  },
];

export const testUsers = [
  {email: 'bob@example.com', password: 'password123', type: 'standard'},
  {email: 'alice@example.com', password: 'password123', type: 'locked_out'},
  {email: 'visual@example.com', password: 'password123', type: 'visual'},
];
