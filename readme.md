# Documentacion API
Todas las consultas estaran en la ruta: /api/v1/

## Formato
###### ruta: ruta que se debe agregar anexar a la ruta especificada antes

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
###### pasajeroDTO:
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
###### conductorDTO
Todas las propiedades pasajeroDTO mas las siguientes propiedades 
```
{
	fechaLicencia: string
	claseLicencia: string
	foto: url
}
```
###### paradaDTO
```
{
    orden: integer,
    viaje: integer,
    ciudad: string,
    plazasLibres: integer,
    hora: timestamp,
    direccion: string,
    carga: int
}
```

###### viajeDTO
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

###### vehiculoDTO
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
## Ruta /usuarios

###### /{usuarioID}
```
get:
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

###### /{usuarioID}/viajes
```
get:
    descipcion: retorna los viajes creados y/o reservados por un usuario
    parametros consulta:
        origen: creados | reservados
            descripcion: Si origen=creados retornará los viajes creados por el conductor
                        con nombre o username igual a usuarioID, en caso contrario se 
                        buscara los viajes reservados por el pasajero asociado a usuarioID.
    ejemplo: get /piñera1/viajes?origen=creados
    resultado:
        {
            viajes: viajeDTO[]
        }

```

###### /{usuarioID/viajes/{viajeID}}
```
get:
    descipcion: retorna los datos de un viaje particular
    parametros: 
        usuarioID: ver Ruta /{usuarioID}
        viajeID: id del viaje al que se accedera
    ejemplo: get /piñera1/viajes/1
    resultado:
        {
            viaje: viajeDTO,
            paradas: paradaDTO[],
            pasajeros: pasajeroDTO[],
            conductor: conductorDTO
        }
```

## Ruta /viajes

###### /
```
get:
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
        /viajes?fechaminima=20-10-2018 00:00:00&fechamaxima=25-10-2018 16:00:00&origen=Concepcion&destino=roma
```

###### /{viajeID}}
```
get:
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
```