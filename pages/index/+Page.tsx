import { hc } from "@/lib/hc";
import { createSignal } from "solid-js";

export default function Page() {
  return (
    <>
      <div class="flex flex-col flex-1">
        <div class="h-20" />
        <button
          class="self-center border rounded px-3 py-1 bg-emerald-500 text-white border-emerald-300 transition active:scale-95"
          onClick={() => {
            hc.stripe.checkout.$post({
              json: {
                items: [
                  { id: 1, quantity: 3 },
                  { id: 2, quantity: 1 },
                  { id: 3, quantity: 1 },
                ],
              },
            });
          }}
        >
          Checkout
        </button>
      </div>
    </>
  );
}

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Counter {count()}
    </button>
  );
}
