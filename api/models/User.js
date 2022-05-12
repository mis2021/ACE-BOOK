const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  role: {type : String},
  token: { type: String },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Muser", userSchema);
