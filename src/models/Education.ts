import mongoose, { Document, Schema } from "mongoose";

export interface IEducation extends Document {
  text: string;
}

const EducationSchema = new Schema<IEducation>(
  {
    text: String,
  },
  { timestamps: true }
);

const Education =
  mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);
export default Education;
