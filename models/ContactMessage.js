import { Schema, model, models } from "mongoose";

const ContactMessageSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  body: { type: String, required: [true, 'Message body is required'] },
},
  {
    timestamps: true
  });

const ContactMessage = models.ContactMessage || model('ContactMessage', ContactMessageSchema);

export default ContactMessage;