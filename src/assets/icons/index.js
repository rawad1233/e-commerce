import ArrowRightIcon from './arriight.svg?react';
import ArrowLeftIcon from './arrleft.svg?react';
import CartIcon from './cart.svg?react';
import GotoShopIcon from './gotoshop.svg?react';
import HeartIcon from './heart.svg?react';
import UserIcon from './user.svg?react';
import Logo from './logo.svg?react';

import c1 from './images/c1.png';
import c2 from './images/c2.png';
import c3 from './images/c3.png';
import c4 from './images/c4.png';
import ch1 from './images/ch1.png';
import ch2 from './images/ch2.png';

export {
  ArrowRightIcon,
  ArrowLeftIcon,
  CartIcon,
  GotoShopIcon,
  HeartIcon,
  UserIcon,
  Logo,
};

export const localProducts = [
  { id: 'local-1', name: 'Product 1', price: 45, image: c1, category: 'tees' },
  { id: 'local-2', name: 'Product 2', price: 39, image: c2, category: 'tees' },
  { id: 'local-3', name: 'Product 3', price: 49, image: c3, category: 'tees' },
  { id: 'local-4', name: 'Product 4', price: 29, image: c4, category: 'shirts' },
];

export const heroImage = ch1;
export const collectionImage = ch2;