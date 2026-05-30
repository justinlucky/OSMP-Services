import { Show, SignInButton, SignUpButton } from '@clerk/nextjs'
import React from 'react'

const cartWithoutuser = () => {
  return (
    <div>
        <h1>
            Your are not signed in. Please sign in to view your cart.
        </h1>
        <Show when="signed-out">
            <p>
                To access your cart and manage your selected services, please sign in to your account. If you don't have an account yet, you can easily create one to enjoy a personalized shopping experience.
            </p>
            <SignInButton mode="modal">
                <button>
                    Sign In
                </button>
            </SignInButton>
            <SignUpButton mode="modal">
                <button>
                    Sign Up
                </button>
            </SignUpButton>
        </Show>
    </div>
  )
}

export default cartWithoutuser