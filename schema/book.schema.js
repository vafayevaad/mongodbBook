const { Schema, model } = require("mongoose");

const Books = new Schema({
  title: {
    type: String,
    required: [true, "Kitob nomi bo'lishi shart"],
    trim: true,
    minLength: [2, "Kitob nomi kamida 2 ta harf bo'lsin"],
    maxLength: [200, "Kitob nomi ko'pi bilan 200 ta harf bo'lsin"],
  },
  full_name: {
    type: String,
    required: true,
    set: (val) => val.trim().toUpperCase(),
    minLength: [3, "Muallif ismi kamida 3 ta harf bo'lsin"],
    maxLength: [100, "Muallif ismi ko'pi bilan 100 ta harf bo'lsin"],
  },
  period: {
    type: String,
    required: [true, "Janr bo'lishi shart"],
    enum: {
      values: ["badiiy", "roman", "hajviy", "romantika", "fantastika", "dramma", "melodramma", "ilmiy ommabop", "hujjatli"],
      message: "{VALUE} bunday qiymat ko'rsatilmagan"
    },
    default: "badiiy",
  },
  pages: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "Sahifalar soni butun son bo'lishi kerak"
    }
  },
  genres: {
    type: String,
     required: [true, "Janr bo'lishi shart"],
    trim: true,
    minLength: [2, "Janr kamida 2 ta harf bo'lsin"],
    maxLength: [100, "Janr ko'pi bilan 100 ta harf bo'lsin"],
  },
  published_year: {  
    type: Number,
    required: [true, "Nashr yili bo'lishi shart"],
    min: [1000, "Nashr yili 1000 dan katta bo'lsin"],
    max: [new Date().getFullYear(), "Nashr yili kelajakda bo'lishi mumkin emas"],
    validate: {
      validator: Number.isInteger,
      message: "Nashr yili butun son bo'lishi kerak"
    }
  },
  details: {
    type: String,
    required: [true, "Tavsif bo'lishi shart"],
    trim: true,
    minLength: [10, "Tavsif kamida 10 ta harf bo'lsin"],
    maxLength: [2000, "Tavsif ko'pi bilan 2000 ta harf bo'lsin"],
  },
  author_info: {                          
    type: Schema.Types.ObjectId,
    required: [true, "Muallif bo'lishi shart"],
    ref: "Author"
  },
  image: {
    type: String,
    default: null,   
  },
}, {
  versionKey: false,                      
  timestamps: true
})

const BooksSchema = model("Books", Books)
module.exports = BooksSchema