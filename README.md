# Modelo API node.js 
## express - sequelize - passport - passport-jwt - roles y habilidades 

un modelo de API para Nodejs con sequelize como ORM para bases de datos relacionales, uso de roles y permisos dinamicos para poder acceder a las rutas y autenticación basada en token con passport y jwt.

La idea es evitar sobre carga de funciones en un solo archivo por consiguiente separo las acciones o funcionalidades por carpetas y en las carpetas por archivos. 

#### Usuario SuperAdmin 
En la carpeta `/seeders/` existe un archivo llamado `20201014000212-userSeed.js`, en este archivo se encuentran los datos de acceso del super usuario puedes cambiarlos por los que desees. 

     name: 'admin',
     lastname :'super admin',
     email: 'admin@admin.com',
     roleId:1,
     password:'123456',

#### Configuración de habilidades

En la carpeta `/helpers/` existe un archivo  `permissions.js` en el cual debemos ir añadiendo las habilidades correspondientes para cada acción, bajo el formato de : 

` { name:"habilidad-seccion", title:"nombre a mostrar" } `

Un ejemplo :

`{ name:"index-roles", title:"mostrar todos los roles" }`.

####Configuración de validaciones 

Las validaciones por defecto estan realizadas en español, escritas de manera manual. Estas validaciones se encuentran en la carpeta `validation` organizadas por tema. 
    
    name-model/actionValidation.js
   
#### Base de datos

###### Ejecutar base de datos

    npx sequelize-cli db:migrate
    
###### Ejecutar seeders

    npx sequelize-cli db:seed:all
    
###### Borrar datos de la base de datos

    npx sequelize-cli db:migrate:undo

###### Crear modelo y migración 

    npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

###### Crear seeder base de datos

    npx sequelize-cli seed:generate --name demo-user

