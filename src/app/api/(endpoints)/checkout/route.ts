import Stripe from "stripe";
import { ICar } from "../../models/Car";
import { NextResponse } from "next/server";
import { exampleImage } from "@/app/utils/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
});

// Katalog'daki aktif ürünleri alıp getirir
const getActiveProducts = async () => {
  let stripeProducts = await stripe.products.list();
  return stripeProducts.data.filter((i) => i.active);
};

// Ödeme Oturmunu Oluştur
export async function POST(req: Request) {
  try {
    //1) isteğin body kısmında gelen araça bilgilerini al
    const car: ICar = await req.json();

    //2) stripe katalog'una kaydedilmiş ürünleri al
    const stripeProducts = await getActiveProducts();

    //3) satın alınacak ürün katalog'da var mı kontrol et
    let foundProduct = stripeProducts.find((i) => i.metadata.product_id === car._id);

    //4) eğer katalog'da yoksa ürünü katalog'a ekle
    if (!foundProduct) {
      foundProduct = await stripe.products.create({
        name: car.make + " " + car.model,
        description: car.description,
        images: [exampleImage],
        default_price_data: {
          unit_amount: car.price * 100, //cent olarak 100 ile yazılır
          currency: "try", //para birimi
        },
        metadata: {
          product_id: car._id,
        },
      });
    }

    //5) ürünün stripe tarafından oluşturulan id'sini ve satın alınacak ürün miktarını bir nesne haline getir
    // clg(foundProduct içinde eklenen ürünler var )
    const product_info: Stripe.Checkout.SessionCreateParams.LineItem = {
      price: foundProduct.default_price as string,
      quantity: 1,
    };
    //6) ödeme oturumu (url) oluştur
    const session = await stripe.checkout.sessions.create({
      line_items: [product_info],
      mode: "payment",
      payment_method_types: ["card"],
      success_url: "http://localhost:3000" + "/success",
      cancel_url: "http://localhost:3000" + "/cancel",
    });

    // console.log("Ödeme oturumu URLsi: ", session); bunun içinde araç bilgileri ve ödeme url oluşur
    //burada direk o url yönlendirmek için res.redirect(session.url,303) şeklinde yapılabilir.
    //7) ödeme oturumu url'ini client'a gönder
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Bir hata oluştu" });
  }
}
