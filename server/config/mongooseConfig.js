import mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.dbUri);

const mongooseConnction = mongoose.connection;

export default mongooseConnction;
