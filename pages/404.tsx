
import { Box, Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'

const Custome404 = () => {
  return (
    <ShopLayout title={'Page not found'} pageDescription={'Nothing to show'}>
        <Box 
          display='flex' 
          justifyContent='center' 
          alignItems='center' 
          height={'calc(100vh - 200px)'}
          sx={{ flexDirection:{ xs:'column', sm:'row' }}}
          >
            <Typography variant='h1' component='h1' fontSize={100} fontWeight={200}>404 |</Typography>
            <Typography marginLeft={2}>NO PAGE fOUND   </Typography>
            
        </Box>

    </ShopLayout>
  )
}


export default Custome404;