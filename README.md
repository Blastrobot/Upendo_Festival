# Upendo Music Festival

🥳 Welcome to Upendo Music Festival and enjoy the best and latest afro beats! 🎹 <br>

https://sample-service-name-a2zw.onrender.com/ -> Full functionality w/ DBs

https://upendofestival.vercel.app/ -> In case the main one is not running

## Features

Website generated for Upendo Music Festival:
- Landing video page
- Home view with access to the line-up, festival intro video, news, Spotify official playlist and Tickets banner
- Artist view, with detailed view for each artist, with info and song preview via Spotify
- News view, where able to check for the latest updates around the festival or artists
- Tickets view, to proceed to the tickets checkout. Need to first make an account or log in
- **If** you get the **admin rights** on your account (for example, for an artist's manager), you would be able to access to an exclusive **admin** view, where you can edit (update) artists info or edit(update) or create new news

## Demo

![image](https://github.com/Blastrobot/Upendo_Festival/assets/114672545/3af5d3e7-c81d-43db-a683-71d9357fe96f)
![image](https://github.com/Blastrobot/Upendo_Festival/assets/114672545/1a8dddcf-28c4-4387-811d-d911cabf5193)

https://github.com/Blastrobot/Upendo_Festival/assets/114672545/af65b459-62fe-4b80-b547-479db87ee0af

## Stack

- React
- JavaScript
- Flask
- Python
- Stripe
- Cloudinary
- Postgres
- Vercel

## Getting started

### Clone the repository:

`git clone https://github.com/Blastrobot/Upendo_Festival`

### Backend installation:

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate`
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

### Frontend installation:

1. Install dependencies: `$ npm install`
2. Run the app: `$ npm run start`

### Open the app in your browser

Visit [http://localhost:3000](http://localhost:3000) in your browser

## Contributing
### Contributors 

<a href="https://github.com/blastrobot/upendo_festival/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=blastrobot/upendo_festival" />
</a>
