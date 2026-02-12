import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  ip: String,
  country: String,
  city: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Visit", visitSchema);
