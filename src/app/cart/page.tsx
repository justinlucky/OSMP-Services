import { Show, UserButton } from "@clerk/nextjs";
import CartWithoutuser from "@/components/cartWithoutuser";
import EmptyCart from "@/components/emptyCart";

const page = () => {
  return (
    <div className="pt-20">
      <h1>Cart Page</h1>
      <Show when="signed-in">
        <EmptyCart />
      </Show>
      <Show when="signed-out">
        <CartWithoutuser />
      </Show>
    </div>
  )
}

export default page