import stripePackage from "stripe";
import handler from "./libs/handler-lib";
import { calculateCost } from "./libs/billings-lib";

export const main = handler(async (event, context) => {
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    // Load our secret key from the  environment variables
    console.log(process.env.stripeSecretKey);
    const stripe = stripePackage(process.env.stripeSecretKey);

    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd"
    });
    return { status: true };
});