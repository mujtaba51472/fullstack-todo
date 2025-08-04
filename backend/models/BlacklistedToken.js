// models/BlacklistedToken.js
import mongoose from 'mongoose';

const blacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true } // Token's natural expiry
}, { timestamps: true });

export default mongoose.model('BlacklistedToken', blacklistedTokenSchema);