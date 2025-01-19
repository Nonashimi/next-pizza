import React from 'react'
import WhiteBlock from './white-block'
import { CheckoutItemDetails } from './checkout-item-details'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import { Button, Skeleton } from '../ui'

type Props = {
    loading: boolean,
    totalAmount: number,
  
}

const VAT = 15;
const DELIVERY_PRICE = 250;

function CheckoutTotalPriceSide({loading, totalAmount}: Props) {
    const Vat_price = Math.ceil(totalAmount * VAT/100);
    const TotalPrice = totalAmount + Vat_price + DELIVERY_PRICE;
    
  return (
    <div className="w-[450px]">
    <WhiteBlock className='p-6 sticky top-4'>
      <div className="flex flex-col gap-1">
        <span className='text-xl'>Итого:</span>
        <span className='h-11 text-[34px] font-extrabold'>{loading ? <Skeleton className="h-11 w-24 rounded-[10px]" /> : `${TotalPrice} ₽`}</span>
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${Vat_price} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount > 0 ?DELIVERY_PRICE : 0} ₽`}
      />
      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  </div>
  )
}

export default CheckoutTotalPriceSide