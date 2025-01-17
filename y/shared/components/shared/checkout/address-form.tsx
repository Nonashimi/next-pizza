import React from 'react'
import WhiteBlock from '../white-block'
import { Textarea } from '../../ui/textarea'
import { Input } from '../../ui'
import { FormTextarea } from '../form-components/form-textarea'
import { AddressInput } from '../address-input'
import { Controller, useFormContext } from 'react-hook-form'

type Props = {}

function AddressForm({}: Props) {
    const { control } = useFormContext();
  return (
    <WhiteBlock title='3. Адрес доставки'>
        <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && <p className='text-red-500 text-sm'>{fieldState.error.message}</p>}
            </>
          )}
        />            <FormTextarea 
                name='comment'
                className='text-base'
                placeholder='Комментарий к заказу'
                rows={5}
                />
        </div>
        
    </WhiteBlock>
  )
}

export default AddressForm