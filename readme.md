# Documentacion API
Todas las consultas estaran en la ruta: /api/v1/

## Formato
###### ruta: ruta que se debe agregar anexar a la ruta especificada antes
{
    {operacion}: Tipo de consulta http (GET, POST, PUT, DELETE)
    descripcion: Descripcion de que hace la consulta
    resultado: Especificacion del formato de la respuesta
    parametros: Parametros que son necesarios para la direccion o ruta (ejemplo: /{parametro1}/viajes)
    parametros consulta: Parametros que no son obligatorios para la direccion o ruta (del tipo ?param=x, ejemplo:
                        /usuarios/rodrigo cordova?byname=true, byname seria el parametro consulta).
    
}

## DTO
Las DTO usadas son:
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
    equipajeMaximo: integer
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
## Ruta /usuarios/

###### Ruta /usuarios/{usuarioID}
```
get:
	descripcion: retorna un pasajeroDTO o conductprDTO
    parametros: 
        usuarioID: username o nombre del usuario
    parametros consulta: 
```

###### Ruta /usuarios/{rut_usuario}/viajes
```
get:
	desciption: retorna los viajes creados y reservados por un usuario
	query params:
		origen: creados | reservados
				descripcion: Si origen=creados retornará los viajes creados por el chofer con id rut_usuario,
						 si origen=reservados retornar los viajes reservados por el pasajero con id rut_usuario
		ejemplo: get /usuarios/18670598-k/viajes?origen=creados
		resultado:

```