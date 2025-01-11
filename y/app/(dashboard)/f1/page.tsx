import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className="">F1 page</div>
        <div className="">
            <Link href={"f1/f2"}>f2</Link>
        </div>
    </div>
  )
}

export default page