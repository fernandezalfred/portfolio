import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
}

const ContactSchema = new Schema<IContact>(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.Contacts || mongoose.model<IContact>("Contacts", ContactSchema);
export default Contact;
