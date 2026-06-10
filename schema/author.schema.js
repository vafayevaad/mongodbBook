const { Schema, model } = require("mongoose");

const Author = new Schema({
  full_name: {
    type: String,
    required: [true, "Full_name bo'lishi shart"],
    trim: true,
    set: (val) => val.trim(),
    minLength: [3, "Kamida 3 ta harf bo'lsin"], 
    maxLength: [50, "Ko'pi bilan 50 ta harf bo'lsin"],
    match: [/^[a-zA-Z\s']+$/, "Faqat harflar bo'lishi kerak"],  
  },
  birth_year: {
    type: Number,
    required: [true, "Tug'ilgan yili bo'lishi kerak"],
    min: [1000, "Tug'ilgan yil 1000 dan katta bo'lsin"],
    max: [new Date().getFullYear() - 15, "Yosh kamida 15 bo'lishi kerak"],
    validate: {
      validator: Number.isInteger,
      message: "Tug'ilgan yil butun son bo'lishi kerak"
    }
  },
  death_year: {
    type: Number,          
    default: null,
    min: [1000, "Vafot yili 1000 dan katta bo'lsin"],
    max: [new Date().getFullYear(), "Vafot yili kelajakda bo'lishi mumkin emas"],
    validate: {
      validator: function(val) {
        if (val === null) return true;
        return val > this.birth_year;
      },
      message: "Vafot yili tug'ilgan yildan katta bo'lishi kerak"  
    }
  },
  bio: {
    type: String,
    required: [true, "Bio bo'lishi shart"],
    trim: true,
    minLength: [10, "Bio kamida 10 ta harf bo'lsin"],
    maxLength: [1000, "Bio ko'pi bilan 1000 ta harf bo'lsin"]
  },
  period: {
    type: String,
    required: [true, "Davr bo'lishi shart"],
    enum: {
      values: ["Temuriylar davri", "Jadid davri", "Sovet davri", "Mustaqillik davri"],
      message: "{VALUE} bunday qiymat ko'rsatilmagan"
    },
    default: "Temuriylar davri",  
  },
  work: {
    type: String,
    required: [true, "Asar bo'lishi shart"],
    trim: true,
    minLength: [2, "Asar nomi kamida 2 ta harf bo'lsin"],
    maxLength: [200, "Asar nomi ko'pi bilan 200 ta harf bo'lsin"]
  },
  region: {
    type: String,
    required: [true, "Viloyat bo'lishi shart"],
    trim: true,
    enum: {
      values: [
        "Toshkent", "Samarqand", "Buxoro", "Namangan",
        "Andijon", "Farg'ona", "Xorazm", "Qashqadaryo",
        "Surxondaryo", "Sirdaryo", "Jizzax", "Navoiy",
        "Qoraqalpog'iston"
      ],
      message: "{VALUE} bunday viloyat mavjud emas"
    }
  },
  picture: {
  type: String,
  required: true
}
}, {
  versionKey: false,
  timestamps: true
});

const AuthorSchema = model("Author", Author);
module.exports = AuthorSchema;