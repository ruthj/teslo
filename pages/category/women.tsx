import { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";


const WomenPage: NextPage = () => {

 const {products, isLoading} = useProducts('/products?gender=women')
 
  return (
    <ShopLayout title={'Women-Teslo-shop'} pageDescription={'Esncuentra los mejores productos para mujer'}>
    <Typography variant='h1' component='h1'>Women</Typography>
    <Typography variant='h2' >Productos para mujer</Typography>
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

export default WomenPage;
