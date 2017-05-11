# Dev

Make sure to run node v6.10. `node -v`

`npm install`
`npm run dev`

Will start and watch a server on `localhost:8000`.


# Config
Create a file called `.env`. Use `.env-template` as inpiration.

# Deploy
Make sure your aws credentials file are correct.
First time deploy.
Run `npm run first-deploy`.
That will deploy the lambda and create a API Gateway. It will also create a file called `claudia.json`. Check that file in to the repo.

Next deploys:
Fill in api_key in `package.json` deploy script. The run `npm run deploy`.
