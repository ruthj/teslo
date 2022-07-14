import NextLink from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next'

import { useState,useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from  'react-hook-form';
import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
//import { tesloApi } from '../../api';
import { AuthContext } from '../../context';



type FormData = {
    name:string
    email: string,
    password: string,

}

const RegisterPage = () => {
    
  const router = useRouter();
  const{ registerUser } = useContext(AuthContext);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onRegister = async({name,email,password}:FormData) => {
    setShowError(false);

    const {hasError} = await registerUser(name,email,password);

    if( hasError){
        setShowError(true);
        setErrorMessage('something is wrong')
        setTimeout(()=>setShowError(false),3000);
        return
    }

    await signIn('credentials',{ email, password });
    

    //CUSTOM LOGIN ----
    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);
  
    //WITHOUT CONTEXT -------
    // try{

    //     const {data}= await tesloApi.post('/user/register', {name,email,password});
    //     const {token,user} = data;
    //     console.log({token,user}) 

    // }catch(error) {
    //     console.log('Error en las credenciales')
    //     setShowError(true)
    //     setTimeout(()=>setShowError(false),3000)
    // }
  }
  return (
    <AuthLayout title={'Ingresar'}>
         <form onSubmit={handleSubmit(onRegister)} noValidate>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                    <Chip
                            label='Usuario y contraseña no validos'
                            color='error'
                            icon={<ErrorOutline/>}
                            className='fadeIn'
                            sx={{display: showError ? 'flex' : 'none'}}
                        />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        label="Nombre completo" 
                        variant="filled" 
                        fullWidth
                        {...register('name',{
                            required:'Este campo es requerido',
                            minLength:{value:2, message:'El nombre deben ser mas de dos caracteres'}
                            
                            
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}

                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        type='email'
                        label="Correo" 
                        variant="filled" 
                        fullWidth 
                        {...register('email',{
                            required:'Este campo es requerido',
                            validate:(val)=>validations.isEmail(val)
                            
                        })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Contraseña" 
                        type='password' 
                        variant="filled" 
                        fullWidth 
                        {...register('password',{
                            required:'Este campo es requerido',
                            minLength:{value:6,message:'Minimo 6 caracteres'}
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button 
                        type='submit'
                        color="secondary" 
                        className='circular-btn' 
                        size='large' 
                        fullWidth
                    >
                        Ingresar
                    </Button>
                </Grid>
                {/* {onClick={ () => navigateTo(`/auth/login?p=${router.asPath}`)} */}
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink  
                        href={ router.query.p ? `/auth/login?p=${ router.query.p }`: '/auth/login' } 
                        passHref
                    >
                        <Link underline='always'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req });
    // console.log({session});

    const { p = '/' } = query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: { }
    }
}

export default RegisterPage;