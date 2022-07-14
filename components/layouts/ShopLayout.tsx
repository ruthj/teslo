import { Title } from "@mui/icons-material";
import Head from "next/head";
import { FC, ReactNode } from "react";

import { Navbar, SideMenu } from '../ui';


interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string,
    children: ReactNode
}

export const ShopLayout: FC<Props> = ({children, title, pageDescription,imageFullUrl}) => {
  return (
    <>
        <Head>
            <Title>{title}</Title>
            <meta name='description' content={pageDescription}></meta>

            <meta name='og:title' content={title}></meta>
            <meta name='og:description' content={pageDescription}></meta>

            {
                imageFullUrl && (
                    <meta name='og:image' content={imageFullUrl}></meta>
                )
            }
        </Head>

        <nav>
            <Navbar />
        </nav>


        <SideMenu />
        
        <main style={{
            margin:'80px auto',
            maxWidth:'1440px',
            padding:'0px 30px'
        }}>
           {children}
        </main>

    </>
  )
}
