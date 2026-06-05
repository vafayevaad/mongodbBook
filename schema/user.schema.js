const { string } = require("joi");
const { Schema, model } = require("mongoose");

const User = Schema(
  {
    username: {
      type: String,
      required: [true, "Username bo'lishi shart"],
      trim: true,
      minLength: [3, "Kamida 3 ta harf bo'lsin"],
      maxLength: [30, "Ko'pi bilan 30 ta harf bo'lsin"],
      match: /^[a-zA-Z/s]+$/,
    },
    email: {
      type: String,
      required: [true, "Email bo'lishi shart"],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Parol bo'lishi shart"],
      minLength: [6, "Parol kamida 6 ta belgi bo'lsin"],
    },
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin", "superAdmin"],
        message: "{VALUE} bunday role mavjud emas",
      },
    otp: {
      type: String,
      required: false
    },
    otpTime: {
      type: BigInt,
      required: false
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