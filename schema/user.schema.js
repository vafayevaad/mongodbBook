const { Schema, model } = require("mongoose");

const User = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username bo'lishi shart"],
      trim: true,
      minLength: [3, "Kamida 3 ta harf bo'lsin"],
      maxLength: [30, "Ko'pi bilan 30 ta harf bo'lsin"],
    },
    email: {
      type: String,
      required: [true, "Email bo'lishi shart"],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email formati noto'g'ri"],
    },
    password: {
      type: String,
      required: [true, "Parol bo'lishi shart"],
      minLength: [6, "Parol kamida 6 ta belgi bo'lsin"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} bunday role mavjud emas",
      },
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserSchema = model("User", User);
module.exports = UserSchema;