const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
  fullname: { type: String },
  password: { type: String },
  phone: { type: String, unique: true },
  username: { type: String, unique: true },
  role: { type: String, enum: ['supervisor', 'superadmin', 'admin', 'user'], default: 'admin' },
}, {
  timestamps: true,
});

UserSchema.plugin(mongoosePaginate);
exports.User = mongoose.model('User', UserSchema);