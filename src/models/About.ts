import mongoose, { Document, Schema } from "mongoose";

export interface IAbout extends Document {
  aboutme: string;
  noofprojects: string;
  yearofexerience: string;
  noofclients: string;
  skills: string;
}

const AboutSchema = new Schema<IAbout>(
  {
    aboutme: String,
    noofprojects: String,
    yearofexerience: String,
    noofclients: String,
    skills: String,
  },
  { timestamps: true }
);

const About = mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);
export default About;
