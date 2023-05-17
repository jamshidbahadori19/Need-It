const express = require("express")
const Strip = require("stripe")
require("dotenv").config()
const stripe =Strip(process.env.STRIP_key)

const payment = async (req,res)=>{
const item = req.body.cardItem

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              description: item.description,
              images: [item.photo],
              place:item.place,
              metadata: {
                id: item._id
              }
            },
            unit_amount: item.price * 100,
          },
          quantity: 1,
        }
      ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
      res.send({url:session.url});
}

const payAllProducts = async (req,res)=>{
  const line_items = req.body.cardItem.map((item)=>{
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.photo],
          place:item.place,
          metadata: {
            id: item._id
          }
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }
  })
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  })
  res.send({url:session.url})
}



module.exports = {payment,payAllProducts}