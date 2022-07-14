import { NextPage } from 'next';

import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';
//import { initialData } from '../database/products';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import {FullScreenLoading} from '../components/ui';



const HomePage: NextPage = () => {

   const {products, isLoading} = useProducts('/products')

  return (
     <ShopLayout title={'Teslo-shop'} pageDescription={'Esncuentra los mejores productso'}>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' >All Products</Typography>
         {
            isLoading
            ? <FullScreenLoading />
            : <ProductList 
                  //products={initialData.products as any} //se borrara
                  products={ products }
               />
         }
     </ShopLayout>
  )
}

export default HomePage
