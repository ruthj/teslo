import { FC } from 'react';
import { Grid } from '@mui/material';
import { IProduct } from '../../interfaces';
import { ProductsCard } from './ProductsCard';

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {

    
  return (
    <>
       <Grid container spacing={4}>
          {
            products.map(product => (
              <ProductsCard 
                key={product.slug}
                product={product}
              />
            ))
          }
       </Grid>
    </>
  )
}
