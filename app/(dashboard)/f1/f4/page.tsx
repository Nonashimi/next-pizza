import Link from 'next/link'
import React from 'react'

const F4 = () => {
  return (
    <div>
        <div className="">F4 page</div>
        <div className="">
            <Link href = {"/f1/f3"}>f3</Link>
        </div>
        <div className="">
            <Link href={"/dashboard"}>About</Link>
        </div>
    </div>
  )
}

export default F4