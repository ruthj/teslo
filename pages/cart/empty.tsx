import NextLink from 'next/link'
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Typography, Link } from "@mui/material";
import { FC } from "react";
import { ShopLayout } from "../../components/layouts";
import { ISize } from "../../interfaces";


interface Props {
    selectedSize: ISize;
    sizes: ISize[];
}

const EmptyPage:FC<Props> = ({selectedSize, sizes}) => {
  return (

    <ShopLayout title={'Empty car'} pageDescription={'No items to buy'}>

        <Box 
          display='flex' 
          justifyContent='center' 
          alignItems='center' 
          height={'calc(100vh - 200px)'}
          sx={{ flexDirection:{ xs:'column', sm:'row' }}}
          >

            <RemoveShoppingCartOutlined sx={{fontSize:100}}/>
            <Box
                 display='flex' 
                 flexDirection='column'
                 alignItems='center' 
            >
                <Typography variant='h1' component='h1' fontSize={100} fontWeight={200}>Car is empty</Typography>
                
                <NextLink href='/'>
                    <Link typography='h4' color='secondary'>
                        Back
                    </Link>
                </NextLink>
            </Box>
           
        </Box>
    </ShopLayout>
  )
}

export default EmptyPage;