import mongoose, { Document, Schema } from "mongoose";

export interface IHome extends Document {
  heading: string;
  summary: string;
}

const HomeSchema = new Schema<IHome>(
  {
    heading: String,
    summary: String,
  },
  { timestamps: true }
);

const Home = mongoose.models.Home || mongoose.model<IHome>("Home", HomeSchema);
export default Home;
