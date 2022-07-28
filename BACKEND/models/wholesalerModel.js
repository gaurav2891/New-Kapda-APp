const mongoose = require("mongoose");
const Slugify = require("slugify");
const bcrypt = require("bcrypt");

const wholesalerSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["wholesaler", "admin", "owner"],
    default: "wholesaler",
  },
  active: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    Max: [15, "name Cannot be greater than 15 letters"],
  },
  firmName: {
    type: String,
    required: [true, "Please Enter Your FirmName"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please Enter your Address"],
  },
  landMark: {
    type: String,
    required: [true, "Please Enter your LandMark area"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Please Enter your valid Mobile Number"],
    unique: [true, "this Number already in use , pleasse try another number"],
    validate: {
      validator: function (el) {
        return el.toString().length === 10;
      },
      message: "Mobile number should be 10 digit",
    },
  },
  whatsappNumber: {
    type: Number,
    required: [true, "Please Enter your valid Mobile Number"],
    unique: [true, "this Number already in use , pleasse try another number"],
    validate: {
      validator: function (el) {
        return el.toString().length === 10;
      },
      message: "whatsapp number should be 10 digit",
    },
  },
  password: {
    type: String,
    required: [true, "password must be at least 13 letters"],
    Min: [13, "password should be more than 13 letters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "passwords are not the same",
    },
    select: false,
  },
  slug: {
    type: String,
  },
  clothCategory: {
    type: String,
    required: [true, "A clothCateogry must have Ready_Made OR kaccha_kapda"],
    // enum: {
    //   values: ["Ready_Made", "Kaccha_Kapda"],
    //   message: ['Business type should be  "Ready_Made" or "kaccha_kapda"'],
    // },
  },
  passwordChangedAt: Date,
});

// MIDDLEWARE
wholesalerSchema.pre("save", function (next) {
  this.slug = Slugify(this.firmName).toLowerCase();
  next();
});

wholesalerSchema.pre("save", async function (next) {
  console.log("This is wholesaler Password 😍", this.password);
  this.password = await bcrypt.hash(this.password, 12);
  console.log("hash Password=>", this.password);
  this.confirmPassword = undefined;

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// wholesalerSchema.pre(/^find/, function (next) {
//   console.log("this WM=>");
//   next();
// });

wholesalerSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

wholesalerSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  //    JWTTIMESTAMP = when user signup , passwordchangedAt = when user login  and create token

  // // check Screeenshot of laptop in DEV FOLDER
  if (this.passwordChangedAt) {
    const changedPasswordAt = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(this.passwordChangedAt, changedPasswordAt, JWTTimeStamp);
    // console.log(this);  ///// this gives USER details

    return JWTTimeStamp < changedPasswordAt;
    /// IF changepaswordAt is gretaer  - means "this.passwordChangedAt "is modified
    ///      JWTTimeStamp is time  -- means  when user LOged in
    ///      JWTTimeStamp is always greater then " this.passwordChangedAt" untill it modified
  }

  // False means password NOT changed   and its default
  return false;
};

const Wholesaler = mongoose.model("wholesaler", wholesalerSchema);

module.exports = Wholesaler;
