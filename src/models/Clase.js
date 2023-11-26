const mongoose = require("mongoose");

const karateLessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const KarateLesson = mongoose.model(
  "KarateLesson",
  karateLessonSchema,
  "clases"
);

module.exports = KarateLesson;
