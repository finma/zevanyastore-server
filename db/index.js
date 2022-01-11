import mongoose from 'mongoose'
import { MONGO_URL } from '../config'

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

export default db