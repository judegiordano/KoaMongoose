import nodemailer from "nodemailer";
import config from "../helpers/config";
import { IMailOptions } from "../types/IAbstract";

const transporter = nodemailer.createTransport(config.MAIL_TRANSPORTER);

export default class Mailer {

	public static async SendMail(options: IMailOptions): Promise<void> {
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
	}
}
