# Graphql gateway routing example

## Install

Clone the repo and install dependencies with `npm install`.

## Run

To run all the services use `npm run dev`. This will start:

* The main *federation gateway* at http://localhost:4000
* The *bands* federated service at http://localhost:4001
* The *albums* federated service at http://localhost:4002
* The *private* federated service at http://localhost:4003


## Test

Go to http://localhost:4000/public-graphql to see the public API graphql endpoint playground.

Go to http://localhost:4000/private-graphql to see the public API graphql endpoint playground. Private API has an additional `private` query on a root level.
