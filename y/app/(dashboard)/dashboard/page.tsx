import Link from 'next/link'
import React from 'react'


function page() {
  return (
    <h2 className=''>Dashboard page
    <br />
      <Link href={"/f1"}>F1</Link>
    </h2>
  )
}

export default page