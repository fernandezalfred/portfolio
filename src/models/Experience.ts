import mongoose, { Document, Schema } from "mongoose";

export interface IExperience extends Document {
  position: string;
  company: string;
  duration: string;
  location: string;
  jobprofile: string;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    position: String,
    company: String,
    duration: String,
    location: String,
    jobprofile: String,
  },
  { timestamps: true }
);

const Experience =
  mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
export default Experience;
