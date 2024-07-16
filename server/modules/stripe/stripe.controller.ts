import { publicConfig } from "@/config.public";
import { storeItems, stripe } from "@/server/services/stripe";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const stripeController = new Hono().basePath("stripe").post(
  "/checkout",
  zValidator(
    "json",
    z.object({
      items: z.array(
        z.object({
          id: z.number(),
          quantity: z.number(),
        })
      ),
    })
  ),
  async (c) => {
    try {
      const body = c.req.valid("json");

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${publicConfig.BASE_ORIGIN}/checkout/success`,
        cancel_url: `${publicConfig.BASE_ORIGIN}/checkout/cancel`,
        line_items: body.items.map((_item) => {
          const storeItem = storeItems.get(_item.id)!;

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem?.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: _item.quantity,
          };
        }),
      });

      return c.json({ url: "HI" });
    } catch (e: any) {
      return c.json({ error: e.message }, 500);
    }

    return c.json({
      todos: [
        {
          id: 1,
          text: "Buy milk",
          completed: false,
        },
      ],
    });
  }
);
