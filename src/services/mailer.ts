import nodemailer from "nodemailer";
import config from "../helpers/config";
import { IMailOptions } from "../types/IAbstract";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.EMAIL,
		pass: config.EMAIL_PASSWORD
	}
});

export default async (options: IMailOptions): Promise<void> => {
	return new Promise((resolve, reject) => {
		transporter.sendMail(options, (error, info) => {
			if (error) {
				return reject(error);
			}
			else {
				return resolve(info.response);
			}
		});
	});
};
