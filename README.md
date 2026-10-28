# La biblioteca de Asterión — Backend

API REST del proyecto final de TripleTen. Permite registrar usuarios,
iniciar sesión y administrar una colección personal de libros.

El frontend utiliza Open Library para buscar libros. Esta API personalizada
gestiona la autenticación y el almacenamiento de los libros guardados.

## Tecnologías

- Node.js y Express.
- MongoDB y Mongoose.
- bcryptjs y JSON Web Token.
- Celebrate/Joi y validator.
- Winston y express-winston.
- Helmet, cors y express-rate-limit.
- ESLint con Airbnb Base y nodemon.

La API local utiliza `http://localhost:3000`.

La base de datos de desarrollo es:
`mongodb://127.0.0.1:27017/asteriondb`.

En desarrollo, la aplicación funciona sin un archivo `.env`.

## Comandos disponibles

- `npm run dev`: inicia el servidor con recarga automática mediante nodemon.
- `npm start`: inicia el servidor con Node, sin recarga automática.
- `npm run lint`: revisa el código con ESLint.

El comando `npm start` no establece automáticamente el entorno de producción.

## Rutas

| Método | Ruta | Función | Autorización |
| --- | --- | --- | --- |
| POST | `/signup` | Registrar un usuario | Pública |
| POST | `/signin` | Iniciar sesión y obtener un JWT | Pública |
| GET | `/users/me` | Consultar los datos del usuario conectado | Bearer Token |
| GET | `/books` | Consultar los libros propios | Bearer Token |
| POST | `/books` | Guardar un libro | Bearer Token |
| DELETE | `/books/:bookId` | Eliminar un libro propio | Bearer Token |

Las solicitudes con cuerpo deben enviarse como JSON.

Las rutas protegidas requieren el encabezado:
`Authorization: Bearer <token>`.

## Usuarios y autorización

El registro recibe nombre, correo electrónico y contraseña.

- El nombre debe tener entre 2 y 30 caracteres.
- El correo debe ser válido y único.
- La contraseña debe tener al menos 8 caracteres y no superar 72 bytes UTF-8.
- Las contraseñas se almacenan como hash y no se devuelven al cliente.
- Los tokens JWT tienen una duración de siete días.

## Libros guardados

Cada libro contiene:

- `openLibraryId`: identificador de la obra en Open Library.
- `title`: título.
- `authors`: arreglo de autores.
- `firstPublishYear`: año de primera publicación.
- `coverUrl`: dirección de la portada.
- `keyword`: término de búsqueda.
- `owner`: usuario propietario, asignado desde el JWT.
- Fechas de creación y actualización.

Los campos obligatorios enviados por el cliente son `openLibraryId`,
`title` y `keyword`.

Cada usuario consulta sus propios libros y solo puede eliminar los que le pertenecen.

Para eliminar un libro se utiliza su `_id` de MongoDB.

## Validación y errores

Las solicitudes se validan antes de llegar a los controladores.
Los errores se gestionan mediante un middleware centralizado.

Se utilizan respuestas 400, 401, 403, 404, 409 y 500 según el tipo de error.
El limitador devuelve 429 cuando se supera el número permitido de solicitudes.

## Registros y seguridad

- `request.log` registra solicitudes y códigos de respuesta.
- `error.log` registra errores enviados al middleware de errores.
- Cada línea de los registros es un objeto JSON independiente.
- No se registran contraseñas, tokens ni cuerpos de solicitudes o respuestas.
- Helmet configura encabezados de seguridad.
- El límite es de 100 solicitudes por IP cada 15 minutos.
- CORS permite los orígenes locales del frontend en el puerto 5173.
- Los archivos `.env`, los registros y `node_modules` están excluidos de Git.

## Variables de entorno de producción

El archivo `.env` se configurará únicamente en el servidor.

- `NODE_ENV`: debe ser `production`.
- `JWT_SECRET`: clave privada para firmar y verificar tokens.
- `DATABASE_URL`: dirección de MongoDB.
- `CORS_ORIGINS`: orígenes permitidos del frontend, separados por comas.
- `PORT`: puerto interno del backend; por defecto, 3000.

La aplicación exige `JWT_SECRET`, `DATABASE_URL` y `CORS_ORIGINS`
cuando se ejecuta en producción.

## Estado del despliegue

Pendiente de despliegue en un servidor independiente para Asterión.

La URL pública HTTPS se añadirá después de configurar el dominio,
el certificado y verificar el funcionamiento de la API.

## Entrega

La rama de esta etapa es `stage-back-end`.

La entrega se realiza mediante un pull request hacia `main`.
La fusión se hará después de la aprobación del revisor.

## Autora

Gabriela Arroyo.
