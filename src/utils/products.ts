import { WatchVariant } from '../types';

export const watchVariants: WatchVariant[] = [
  {
    id: 'Middleverient',
    name: 'Mowa - 180',
    price: 180.00,
    color: 'full of dry fruit',
    image: 'https://5.imimg.com/data5/JY/TC/MY-13730480/buy-best-quality-joynagarer-moa-online-500x500.png'
  },
  {
    id: 'luxury-brown',
    name: 'Mowa - 300',
    price: 300.00,
    color: 'mixing of ghee & dry fruit',
    image: 'https://www.cuisineghar.com/images/food_image/11672319187.jpg'
  },
];

export const getVariantById = (id: string): WatchVariant => {
  return watchVariants.find(variant => variant.id === id) || watchVariants[0];
};