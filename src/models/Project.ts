import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  website: string;
  technologies: string;
  github: string;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: String,
    website: String,
    technologies: String,
    github: String,
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
