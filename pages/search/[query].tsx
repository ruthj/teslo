import type { NextPage,GetServerSideProps } from 'next'
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';


interface Props {
    products: IProduct[];
    foundProducts:boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

 
  return (
     <ShopLayout title={'Teslo-shop'} pageDescription={'Esncuentra los mejores productso'}>
        <Typography variant='h1' component='h1'>Buscar</Typography>
        

            {
                foundProducts
                ? <Typography variant='h2' textTransform='capitalize'>{query}</Typography>
                : <Typography variant='h2' >No encontramos ningun producto {query} </Typography>
            }
      
             <ProductList 
                  //products={initialData.products as any} //se borrara
                  products={ products }
               />
         
     </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    
    const {query = ''} = params as {query:string};

    if(query.length ===0){
        return {
            redirect: {
                destination:'/',
                permanent:true,
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query);

    const foundProducts = products.length > 0;

    if(!foundProducts){
        //products = await dbProducts.getAllProducts(); 
        products = await dbProducts.getProductsByTerm('shirt'); //siempre va a devolver algo 
    }


    return {
        props: {
            products
        }
    }
}

export default SearchPage;
