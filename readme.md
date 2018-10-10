# Documentacion API
Todas las consultas estaran en la ruta: /api/v1/

## Formato
##### ruta: ruta que se debe agregar anexar a la ruta especificada antes

```
{
    {operacion}: Tipo de consulta http (GET, POST, PUT, DELETE)
    descripcion: Descripcion de que hace la consulta
    resultado: Especificacion del formato de la respuesta
    parametros: Parametros que son necesarios para la direccion o ruta (ejemplo: /{parametro1}/viajes)
    parametros consulta: Parametros que no son obligatorios para la direccion o ruta (del tipo ?param=x, ejemplo:
                        /usuarios/rodrigo cordova?byname=true, byname seria el parametro consulta).
    
}

```

## Data Transfer Objects
Los DTO usados son:
##### pasajeroDTO:
```
{
	nombre: string
	apellido: string
	nombreUsuario: string
	mail: string
	celular: string 	
	rut: string
	valoracion: float
}
```
##### conductorDTO
Todas las propiedades pasajeroDTO mas las siguientes propiedades 
```
{
	fechaLicencia: string
	claseLicencia: string
	foto: url
}
```
##### paradaDTO
```
{
    orden: integer,
    viaje: integer,
    ciudad: string,
    plazasLibres: integer,
    hora: timestamp,
    direccion: string,
    carga: integer
}
```

##### viajeDTO
```
{
    id: integer,
    patente: string,
    origen: string,
    destino: string,
    fecha: timestamp,
    equipajeMaximo: integer,
    paradas: paradaDTO[]
}
```

##### vehiculoDTO
```
{
    patente: string,
    maraca: string,
    modelo: string,
    aptoSillaBebe: boolean,
    dosPasajerosAtras: boolean,
    capacidadEquipaje: integer,
    numeroPlazas: integer,
    conductor: string
}
```

##### reservaDTO
```
{
    id: integer,
    pasajero: string,
    viaje: integer,
    origen: string,
    destino: string,
    estado: string
}
```

## Ruta /usuarios

##### /usuarios/{usuarioID}
```
GET:
    descripcion: Accede a un usuario por nombre o username
    parametros: 
        usuarioID: username o nombre del usuario
    parametros consulta: 
        driver: true | false
            descripcion: si true, se retornara un conductorDTO, en caso contrario pasajeroDTO
        byname: true | false
            descripcion: si true, se buscara al usuario por nombre, en caso contrao por username
    ejemplo: get /usuarios/Sebastian Piñera?byname=true&driver=true
    resultado: conductorDTO o pasajeroDTO
```

##### /usuarios/{usuarioID}/viajes
```
GET:
    descipcion: retorna los viajes creados por un conductor identificado
                por usuarioID
    parametros: 
        usuarioID: ver Ruta /{usuarioID}
    ejemplo: get /usuarios/piñera1/viajes
    resultado: viajes: viajeDTO[]

```
```
POST:
    descipcion: crea un viaje
    parametros: 
        usuarioID: ver Ruta /{usuarioID}
    ejemplo: post /usuarios/piñera1/viajes (incluir body del request)
    body: viajeDTO - {id}
```
###¿### /usuarios/{usuarioID/viajes/{viajeID}}
```
GET:
    descipcion: retorna los datos de un viaje particular creado por 
                el usuario identificado por usuarioID
    parametros: 
        usuarioID: ver Ruta /{usuarioID}
        viajeID: id del viaje al que se accedera
    ejemplo: get usuarios/piñera1/viajes/1
    resultado:
        {
            viaje: viajeDTO,
            paradas: paradaDTO[],
            pasajeros: pasajeroDTO[]
        }
```
```
DELETE:
    descipcion: elimina un viaje
    parametros: 
        usuarioID: ver Ruta /{usuarioID}
        viajeID: id del viaje al que se accedera
    ejemplo: delete /usuarios/piñera1/viajes/1

```
##### /usuarios/{usuarioID/viajes/{viajeID}/reservas}
```
GET:
    descipcion: Retorna las reservas de un viaje particular creado por 
                el usuario identificado con usuarioID
    parametros: 
        usuarioID: ver Ruta /{usuarioID}
        viajeID: id del viaje al que se accedera
    ejemplo: get usuarios/piñera1/viajes/1/reservas
    resultado:
        {
            viaje: viajeDTO,
            reservas: reservaaDTO[]
        }
```

##### /usuarios/{usuarioID/viajes/{viajeID}/reservas/{reservaID}
```
GET:
    descipcion: Retorna los datos de una reserva hecha a un viaje
                creado por el usuario identificado con usuarioID
    parametros: 
        usuarioID: ver Ruta /{usuarioID}
        viajeID: id del viaje al que se accedera
        reservaID: id de la reserva que se vera
    ejemplo: get usuarios/piñera1/viajes/1/reservas
    resultado:
        {
            viaje: viajeDTO,
            paradas: paradaDTO[],
            pasajeros: pasajeroDTO[]
        }
```


## Ruta /viajes

##### /viajes
```
GET:
    descripcion: retorna una lista de viajes
    parametros consulta:
        fechaminima: timestamp
            descripcion: Minimo de la fecha que puede tener un viaje en la lista
        fechamaxima: timestamp
            descripcion: Maximo de la fecha que puede tener un viaje en la lista
        origen: string
            descripcion: Ciudad de origen por la que deben comenzar o pasar los viajes en la lista.
        destino: string
            descripcion: Ciurdad de destino por la que deben pasar o terminar los viajes en la lista.
    ejemplo:
        get /viajes?fechaminima=20-10-2018 00:00:00&fechamaxima=25-10-2018 16:00:00&origen=Concepcion&destino=roma
    resultado: viajesDTO[]
```

##### /viajes/{viajeID}}
```
GET:
    descipcion: retorna los datos de un viaje particular
    parametros: 
        viajeID: id del viaje al que se accedera
    ejemplo: get /piñera1/viajes/1
    resultado:
        {
            viaje: viajeDTO,
            paradas: paradaDTO[],
            pasajeros: pasajeroDTO[],
            conductor: conductorDTO
        }
POST:
    descripcion: pide reservar una o mas plazas en el viaje // se deben agregar cosas
    parametros:
        viajeID: id del viaje al que se pedira la reserva
    body: reservaDTO - {id}
```

##### /viajes/{viajeID}/reservas/