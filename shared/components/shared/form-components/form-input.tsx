"use client"

import React from 'react'
import { RequiredSymbol } from '../required-symbol'
import { Input } from '../../ui'
import { ClearButton } from '../clear-button'
import { useFormContext } from 'react-hook-form'


interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    name: string,
    label?: string,
    required?: boolean,
    className?: string
}

function FormInput({name, label, required, className, ...props}: Props) {
    const {
        register,
        formState: {errors},
        watch,
        setValue,
    } = useFormContext();

    const value = watch(name);
    const error = errors[name]?.message as string;
    const onCLickClear = () => {
        setValue(name, "");
    }
  return (
    <div className={className}>
        {label && (
            <p className='font-medium mb-2'>
                {label} {required && <RequiredSymbol/>}
            </p>

        )}
        <div className="relative">
            <Input className='h-12 text-md' {...props} {...register(name)}/>
            {value && <ClearButton onClick = {onCLickClear}/>}
        </div>
        {error  && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default FormInput