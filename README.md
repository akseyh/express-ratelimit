# Express Rate Limit

This is a basic rate limit application developed with [express](https://expressjs.com).

## Running locally
- Copy .env.example file as .env and fill it
- Run with docker-compose
```sh
docker-compose up -d --build
```

## Rate Limits
Rate limits can be configure on .env file. By default it is 100req/h for ip and 200req/h for token.

## Endpoints

### Get token
`POST /token`
Returns a jwt token. It has a rate limit for ip.

**Response**
```json
{ "token": "jwt_token" }
```

### Public route
`GET /`
Returns name of the application. It has a rate limit for ip.

**Response**
```json
"Express Rate Limit App"
```

### Private route
`POST /`
Returns name of the application. It has a rate limit for token.
Takes jwt token on headers authorization.

**Response**
```json
"Express Rate Limit App"
```
