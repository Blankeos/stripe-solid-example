import { privateConfig } from "@/config.private";
import Stripe from "stripe";

export const stripe = new Stripe(privateConfig.stripe.PRIVATE_KEY);

export const storeItems = new Map([
  [1, { priceInCents: 500, name: "Watercolor Brush Set" }],
  [2, { priceInCents: 500, name: "Crayon Brush Set" }],
  [3, { priceInCents: 350, name: "B2 Brush Set" }],
]);
