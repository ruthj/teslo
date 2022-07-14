import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import { IOrder } from '../../../interfaces';
import { Product, Order } from '../../../models';
import { db } from '../../../database';

type Data = 
    | {message: string}
    | IOrder;


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
   
   switch ( req.method ){
    case 'POST':
       console.log('switch POST');
        return createOrder(req, res);

    default:
        console.log('default');
        return res.status(400).json({ message: 'Bad Request' })



   }
   
   
    
}

const  createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {orderItems, total} = req.body as IOrder;


    //VERIFICAR QUE TENGA UN USUARIO
    const session: any = await getSession({ req });

    if( !session ){
        return res.status(401).json({message: 'Debe estar autenticado para hacer esto'});
    }

    console.log('session',session)

    //CREAR ARREGLO DE PRODUCTOS 
    const productsIds = orderItems.map(product => product._id)
    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsIds } });
    console.log('dbProducts', {dbProducts});

    try {

        const subTotal = orderItems.reduce( ( prev, current ) => {

            const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price;

            if ( !currentPrice ){
                throw new Error ('Verifique el carrito de nuevo, producto no existe');
            }

            return (currentPrice * current.quantity) + prev
        
        }, 0 );

        console.log('subTotal', subTotal)
        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backEndTotal = subTotal * ( taxRate + 1 );

        console.log('backEndTotal', backEndTotal)

        if ( total !== backEndTotal ){
            throw new Error ('El total no cuandra con el monto a pagar')
        }

        //Todo bien hasta la linea 72

        const userId = session.user._id;
        //console.log('userId ----->>>>>>',userId)

        const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
        //console.log('newOrder ******', newOrder)
        await newOrder.save();

        await db.disconnect();

        return res.status(201).json(newOrder);

    } catch(error:any) {
        
        await db.disconnect();
        console.log(error);
        res.status(400).json({

             message: error.message || 'Revise logs del servidor'
            
        })

    }



    //return res.status(201).json(req.body);

}

