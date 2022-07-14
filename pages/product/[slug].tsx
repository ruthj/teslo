import { useState, useReducer, useContext } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductsSlideShow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';

import { IProduct, ISize } from '../../interfaces/products';
import { dbProducts } from '../../database';
import { ICartProduct } from '../../interfaces/cart';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart/CartContext';


interface Props {
  product: IProduct
}

 const ProductPage: NextPage<Props> = ({ product }) => {
    //*ESTA ES UNA MANERA DE HACER LA PETICIONA BASE DE DATOS

    // const router = useRouter();

    // const {products:product, isLoading} = useProducts(`/products/${router.query.slug}`)
    
   //Pregenerada del lado del servidor
    const {addProductToCart}= useContext(CartContext);
    const router = useRouter();

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id:product._id,
      image:product.images[0],
      price:product.price,
      size: undefined,
      slug:product.slug,
      title: product.title,
      gender:product.gender,
      quantity:1,
    }); //estado temporal

    const selectedSize = ( size:ISize ) =>{
      setTempCartProduct(currentProduct => ({
        ...currentProduct,
        size
      }))
    }

    const onUpdatedQuantity = ( quantity:number ) =>{
      setTempCartProduct(currentProduct => ({
        ...currentProduct,
        quantity
      }))
    }

    const onAddProduct = (  ) =>{
      if(!tempCartProduct.size){return;}

      //llamar la ccion del context
      addProductToCart(tempCartProduct);
      router.push('/cart');
    }

  return (
    <ShopLayout title={product.title} pageDescription={'Producst sssssssdgsdgs'}>
        <Grid container spacing={3}>

          <Grid item  xs={12} sm={7}>
            <ProductsSlideShow images={product.images}/>
           
          </Grid>

          <Grid item xs={12} sm={5}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h1' component='h1'>{product.title}</Typography>
              <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>


              <Box sx={{my:2}}>
                <Typography variant='subtitle2' component='h1'>Cantidad</Typography>
                <ItemCounter 
                  currentValue={tempCartProduct.quantity}
                  updatedQuantity={(quantity) => onUpdatedQuantity(quantity)}
                  maxValue={product.inStock > 5 ? 5 : product.inStock}

                />
                <SizeSelector 
                  sizes={product.sizes} 
                  selectedSize={ tempCartProduct.size} 
                  onSelectedSize={(size) => selectedSize(size)}
                
                />

              </Box>

              
                {
                  (product.inStock > 0)
                  ? (
                    <Button color='secondary' className='circular-btn'  onClick={ onAddProduct }>
                        {
                          tempCartProduct.size
                          ?'Add to car'
                          :'Selecciona una talla'
                        }
                      </Button>
                    )
                  : ( <Chip label='There is not available' color='error' variant='outlined' />)
                }
              {/* */}

              <Box sx={{mt:3}}>
                  <Typography variant='subtitle2'>Description</Typography>
                  <Typography variant='body2'>{product.description}</Typography>
              </Box>
           
            </Box>

          
          </Grid>
      </Grid>

    </ShopLayout>
  )
}



// getServerSideProps 

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
//* No usar esto.... SSR

//PAGINA GENERADA DESDE EL SERVIDOR
//muchas cosas se mantien iguales
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug( slug );

//   if ( !product ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProducts.getAllProductSlugs();

  
  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}



export default ProductPage;