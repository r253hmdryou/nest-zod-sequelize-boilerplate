## Installation

```bash
$ npm ci
```

## Running the app

```bash
# db setup (development)
$ docker-compose up -d
$ npm run build:db
$ npm run db:migrate
$ npm run db:seed

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
