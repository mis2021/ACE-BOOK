const { model, Schema, mongoose } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, default: null },
  firstName: { type: String },
  middleName: { type: String, default: null },
  suffix: { type: String, default: null },
  lastName: { type: String },
  position: { type: String , default: null},
  isActive: { type: Boolean , default: true },
  isApprover: { type: Boolean , default: false },
  contact: { type: String  },
  email: { type: String, unique: true, default: null },
  password: { type: String },
  // role: {type : String , default: null},
  token: { type: String , default: null },
  departmentOnDuty:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  department:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  }],
   restrictionCode: [{ type: String }],
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("MUser", userSchema);
