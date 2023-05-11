const express = require("express")
const Strip = require("stripe")
require("dotenv").config()
const stripe =Strip(process.env.STRIP_key)
const payment = async (req,res)=>{
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map(item=>{
        console.log(item)
        return{
          price_data: {
            currency: 'sek',
            product_data: {
              name: item.name,
              description:item.description,
              photo:[item.photo],
            },
            unit_amount: item.price,
          },
          quantity: 1,
        }
      }),
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
      res.send({url:session.url});
}

module.exports = payment