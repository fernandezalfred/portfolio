import mongoose, { Document, Schema } from "mongoose";

export interface IExperience extends Document {
  text: string;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    text: String,
  },
  { timestamps: true }
);

const Experience =
  mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
export default Experience;
