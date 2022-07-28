const mongoose = require("mongoose");
const slugify = require("slugify");

const retailerSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: [true, "Retailer name Require"],
    },
    firmName: {
      type: String,
      required: [true, "Firm Name Require"],
    },
    RfirmId: {
      type: String,
      unique: [
        true,
        "this firmName already in use , pleasse try another firmName",
      ],
      // required: true,
    },
    location: {
      type: String,
      required: [true, "Address Require"],
    },
    district: {
      type: String,
      required: [true, "Please Provide District"],
    },
    state: {
      type: String,
      required: [true, "Please provide state"],
    },
    clothCategory: {
      type: String,
      required: [true, "please provide clothCateogry"],
      // enum: {
      //   values: ["Ready_Made", "Kaccha_kapda"],
      //   message: ['Business type should be  "Ready_Made" or "Kaccha_kapda"'],
      // },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

retailerSchema.pre("save", function (next) {
  this.RfirmId = slugify(`${this.firmName} ${this.district}`, {
    lower: true,
  });
  this.clothCategory = this.clothCategory.toLowerCase();
  // slugify is a string which comes along with url
  next();
});

// retailerSchema.pre(/find/, function (next) {
//   this.select("name firmName clothCategory _id active location");
//   next();
// });

// retailerSchema.post(/find/, function (doc, next) {
//   console.log("DOCCCCCCCCCCCCCCCCCCCCC", doc);
//   doc = doc.filter((retailer) => retailer.active == false);
//   console.log("doc ye jayega =>", doc);
//   this.filteredDoc = doc;
//   next();
// });

retailerSchema.index({ RfirmId: 1 });

const Retailers = mongoose.model("retailer", retailerSchema);

module.exports = Retailers;
