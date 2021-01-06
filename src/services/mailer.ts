import nodemailer from "nodemailer";
import config from "../helpers/config";
import IMailOptions from "../types/IMailOptions";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.EMAIL,
		pass: config.EMAIL_PASSWORD
	}
});

const sendMail = async (options: IMailOptions) => {
	return new Promise((resolve, reject) => {
		transporter.sendMail(options, (error, info) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(info.response);
			}
		});
	});
};

export default sendMail;
