import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
	_id: string,
	email: string
	password: string,
	activated: boolean,
	created: Date,
	lastUpdated: Date
}

const User = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		activated: {
			type: Boolean,
			default: false
		},
		created: {
			type: Date,
			default: Date.now()
		},
		lastUpdated: {
			type: Date,
			default: Date.now()
		},
	},
	{
		collection: "User",
		versionKey: false
	}
);

export default mongoose.model<IUser>("User", User);
