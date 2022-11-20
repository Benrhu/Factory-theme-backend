const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        passwordHash: String,
        sales: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Sales'
            }
        ],
        newLeads: Number,
        closedLeads: Number,
        benefits: Number,
        userId: String
    }
)

userSchema.set('toJSON', {
    transform: (docuemnt, returnedObject) => {
        returnedObject.userId = returnedObject._userId
    }
})

const User = model('User', userSchema)

module.exports = User