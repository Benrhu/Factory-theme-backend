/**
 * A lead is a potencial customer,
 * a sale is a closed deal wwith its invoice
 */

const { Schema, model } = require('mongoose')

const salesSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        company: String,
        industry: String,
        phone: String,
        email: String,
        ticketAmount: Number,
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        paymentMethod: String
    }
)

const Sales = model('Sales', salesSchema)

module.exports = Sales