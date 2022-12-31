# advanced-register

## Tools

![Node.js](https://img.shields.io/badge/-Node.js-000?style=for-the-badge&logo=Nodedotjs&logoColor=448940)
![MongoDB](https://img.shields.io/badge/-MongoDB-000?style=for-the-badge&logo=MongoDB&logoColor=53C729)
![Dotenv](https://img.shields.io/badge/-Dotenv-000?style=for-the-badge&logo=Dotenv&logoColor=EDD641)
![Express](https://img.shields.io/badge/-Express-000?style=for-the-badge&logo=Express&logoColor=ffffff)
![JWT](https://img.shields.io/badge/-JWT-000?style=for-the-badge&logo=jsonwebtoken&logoColor=EDD641)
![Nodemailer](https://img.shields.io/badge/-Nodemailer-000?style=for-the-badge&logo=Nodemailer&logoColor=EDD641)
![Uuid](https://img.shields.io/badge/-Uuid-000?style=for-the-badge&logo=Uuid&logoColor=EDD641)

## Start api

Once you have downloaded the source code of the api, follow these steps.

* Install the dependencies with the `npm install` command.

```powershell
npm install
```

* Change the file name `file.txt` on `.env`

* Fill in the empty variables in the file `.env` with your data.

```env
PORT=5000
URL_DB=mongodb+srv://YOURUSERNAME:YOURPASSWORD@cluster...
URL_API=http://localhost:5000
URL_CL=https://google.com
JWT_ACCESS_SECRET=ACCESS_SECRET
JWT_REFRESH_SECRET=REFRESH_SECRET
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Do not forget that before you specify your mail as mail for mailing, you must configure it. (example: IMAP for gmail)
SMTP_EMAIL=
SMTP_PASS=
```

* Launch the api using the `npm run start` command.

If you have followed all the instructions correctly, the api should work.
