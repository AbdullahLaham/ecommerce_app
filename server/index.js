const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")('sk_test_51LMHmvAw2oupCOB0zk8Vvq55pNjq7zCcLni6sE61D2Q1G6AETsyBUJ1WcKWl8dsBwH4Qv2dcGyWxu8CKd9ljUZzn00dfBc0csB')
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount: 1000,
			currency: "USD",
			description: "JSX Company",
			payment_method: id,
			confirm: true,
			
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("ErrorErrorErrorErrorErrorErrorErrorErrorErrorError", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(process.env.PORT || 4000, () => {
	console.log("Sever is listening on port 4000")
})
