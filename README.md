# tu-change


## run database postgresql en docker 
## este tambien correria en 
```
  docker compose up --build -d
```

### generar el sha del api key:

```
  echo -n "tu_chance_api_key" | shasum -a 256
```


# Backend
## crear archivo .env en el backend
* copiar las mismas que tiene el .env.template


## Ejecuar la base de datos
```
  npm run dev
```

## ejecutar el seed
- en postman ejecuar el localhost:8000/seed metodo post para llenar la base de datos con alumnos de prueba



# Front
## crear archivo .env en el front
* copiar las mismas que tiene el .env.template

## ejecutar el front
```
  npm run dev
```

# PASOS  a mejorar

- crear mas relaciones con la informacion de los padres
- crear una referencia por el alunmo como un codigo unico para que no hayan duplicados