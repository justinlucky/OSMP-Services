import  Link  from 'next/link'
import React from 'react'

const emptyCart = () => {
  return (
    <div>
        <h1>Your cart is currently empty.</h1>
        <p>
            Browse our wide range of services and add your desired ones to the cart. Once you've added services, they will appear here for you to review and proceed to checkout.
        </p>
        <Link href="/services" className="text-blue-600 hover:underline">
            Explore Services
        </Link>
    </div>
  )
}

export default emptyCart