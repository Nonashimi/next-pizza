import React from 'react'

type Props = {
    params: {id: string}
}

function page({params}: Props) {
  return (
    <div>
        PRODUCT: {params.id}
    </div>
  )
}

export default page