# sat-viewer

Take, analyze and show data from satellites and other environmental data sources

## Routes

### `/elevation`

Query args:

- `lat`: double
- `long`: double

Example

```
http://localhost:8080/elevation?lat=-24.0407865&long=-52.3517281
```

### `/slope`

Query args:

- `lat`: double
- `long`: double

Example

```
http://localhost:8080/slope?lat=-24.0407865&long=-52.3517281
```

### `/report`

Query args:

- `lat`: double
- `long`: double

Example

```
http://localhost:8080/report?lat=-24.0407865&long=-52.3517281
```


## Running
``` bas
docker compose up --build
```
