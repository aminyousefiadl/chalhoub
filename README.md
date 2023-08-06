### chalhoub-products

#### Run The App With Docker Compose

1. Install `docker compose`
1. navigate to the root directory
1. Run the command `sudo docker compose -f docker-compose.yml up -d --build`
1. Visit URl `http;//localhost:3000`
1. To stop the docker run `sudo docker compose -f docker-compose.yml down`

- Note: Based on the version of docker compose execute either with `docker compose` or `docker-compose`

#### Run The App Without Docker

1. Move to `api` folder
1. Run the command `npm install`
1. Run the command `npm run dev`
1. If the `api` or `www` app fails to run, please restart the `api` app due to Typescript transpile

1. In another terminal, move to `www` folder
1. Run the command `yarn`
1. Run the command `yarn dev`
1. Visit URl `http;//localhost:3000`

---

Notes:

- `The main client should be able to place a promotional full banner on the top, middle, or bottom of the product list page.` : This one could be achieved via a separate app for client or a separate page for authenticated users. Due to lack of time, this is not considered in the app development
