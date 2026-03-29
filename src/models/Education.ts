import mongoose, { Document, Schema } from "mongoose";

export interface IEducation extends Document {
  degree: string;
  year: string;
  college: string;
}

const EducationSchema = new Schema<IEducation>(
  {
    degree: String,
    year: String,
    college: String,
  },
  { timestamps: true }
);

const Education =
  mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);
export default Education;
