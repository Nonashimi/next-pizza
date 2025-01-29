
import Container from '@/shared/components/shared/container';
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation';
import React from 'react'
import ChooseForm from '@/shared/components/shared/choose-form';

type Props = {
    params: {id: string}
}

async function Page({params}: Props) {
  const product = await prisma.product.findFirst({
    where: {id: Number(params.id)}, 
    include: {
       ingredients: true,
       category: {
          include: {
            products: {
              include: {
                variance: true
              }
            }
          }
       },
       variance: true,
    }});

  if(!product){
    return notFound();
  }

  
  return (
    <Container className = {"flex flex-col my-10"}>
      <ChooseForm product={product}/>
    </Container>
  )
}

export default Page