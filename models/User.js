import { Schema, model } from 'mongoose'

const User = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  surname: { type: String, required: false },
  city: { type: String, required: false },
  age: { type: String, required: false },
  sex: { type: String, required: false },
  examinations: [
    {
      type: { type: String },
      date: { type: String },
      result: { type: String },
      recommendation: { type: String },
    },
  ],
})

export default model('User', User, 'usersInformation')
