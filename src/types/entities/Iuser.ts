import { Document } from "mongoose";

interface IUser extends Document {
	_id: string,
	email: string
	password: string,
	activated: boolean,
	created: Date,
	lastUpdated: Date
}

export default IUser;