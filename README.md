# Arda-Challenge

A service that have ledger that keeps track of a user's tokens and the current USD value.

### To install the service Dependencies

```
npm install
```

### To start the service

```
npm run dev
```

## To start, you will need a create a user and authenticate the credentials,

## this will give a JWT token that you will use for subsequent calls to the API service

### To create a user

```
Request Type: POST
Route: http://localhost:3000/api/user/create
Request Body: {"name": "test_user", "userName": "test_user", "password": "changeMe123_"}
```

### To authenticate your credentials

```
Request Type: POST
Route: http://localhost:3000/api/user/authentication
Request Body: {"userName": "test_user", "password": "changeMe123_"}
```

### To create a ledger and credit a user with a token

```
Request Type: POST
Route: http://localhost:3000/api/ledger/create
Request Body: {"user": "test_user", "token": 2.9}
```

### To returns the history of tokens a user has won for the current day so far

```
Request Type: GET
Route: http://localhost:3000/api/ledger/current/token/history/:userId
```

### To returns the history of USD amounts a user has won till now (till the previous day)

```
Request Type: GET
Route: http://localhost:3000/api/ledger/current/usd/history/:userId
```

### To returns the stats: sum of tokens won on the current day so far and the total value of USD a user has in his account

```
Request Type: GET
Route: http://localhost:3000/api/ledger/current/user/stats/userId
```

### To returns the tokens and the USD value a user won on a given date

```
Request Type: GET
Route: http://localhost:3000/api/ledger/user/history?user=userId&date=requestedDate
```

### To run Test

```
npm run test
```
