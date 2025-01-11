import Container from '@/components/shared/container';
import GroupVariance from '@/components/shared/group-variance';
import ProductImage from '@/components/shared/product-image';
import { Title } from '@/components/shared/title';
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
    params: {id: string}
}

async  function page({params}: Props) {
  const product = await prisma.product.findFirst({where: {id: Number(params.id)}});

  if(!product){
    return notFound();
  }

  return (
    <Container className = {"flex flex-col my-10"}>
      <div className="flex flex-1">
        <ProductImage src = {product.imageUrl} alt = {product.name} className = "" size = {30}/>
        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={product.name} size='md' className='font-extrabold mb-1'/>
          <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusamus laborum voluptatum velit tempora. Blanditiis tempore ex voluptas nostrum repellendus?</p>
          <GroupVariance
           selectedValue='1'
           
           items = {[{
            name: 'Маленькая',
            value: '1',
            },
            {
              name: 'Средняя',
              value: '2',
            },
            {
              name: 'Большая',
              value: '3',
            }
            ]}/>
        </div>
      </div>
    </Container>
  )
}

export default page