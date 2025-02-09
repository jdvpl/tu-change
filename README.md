# tu-change


## run database postgresql

```
  docker compose up --build -d
```

### generar el sha del api key:

```
  echo -n "tu_chance_api_key" | shasum -a 256
```