import mongoose from "mongoose";

export default async (collection: string): Promise<number> => {
	const increment: any = await mongoose.model(collection).find({}).select("id -_id").sort({ id: -1 }).limit(1);
	if (increment.length <= 0 || increment.length === undefined) {
		return 1;
	}
	return increment[0]._doc.id + 1;
};