import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { ISize } from "../../interfaces";


interface Props {
    selectedSize?: ISize;
    sizes: ISize[];

    onSelectedSize:(size: ISize) => void
}

export const SizeSelector:FC<Props> = ({selectedSize, sizes, onSelectedSize}) => {
  return (
    <Box sx={{my:2}} >
        {
            sizes.map(size => (
                <Button 
                    key={size} 
                    size='small' 
                    color={selectedSize === size ? 'primary' :'info'}
                    onClick={() => onSelectedSize(size) }
                >
                    {size}
                </Button>
            ))
        }

        {/* <Typography variant='subtitle2' component='h1'>Cantidad</Typography>
        */}

    </Box>
  )
}
