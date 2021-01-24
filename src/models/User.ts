import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
	_id: string,
	id: number,
	email: string
	password: string,
	activated: boolean,
	created: Date,
	lastUpdated: Date
}

const User = new mongoose.Schema(
	{
		id: {
			type: Number,
			default: 1,
			required: true
		},
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
			default: new Date()
		},
		lastUpdated: {
			type: Date,
			default: new Date()
		},
	},
	{
		collection: "User",
		versionKey: false
	}
);

export default mongoose.model<IUser>("User", User);
