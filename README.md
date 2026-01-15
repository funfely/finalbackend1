# Entrega Final – Backend 1

Este proyecto corresponde a la entrega final del curso de Programación Backend 1 y fue desarrollado utilizando Node.js, Express, MongoDB, Handlebars y Socket.IO.

## Cómo probar el proyecto

1. Clonar el repositorio y posicionarse en la carpeta del proyecto.

2. Instalar las dependencias ejecutando el siguiente comando:
   
   npm install

3. Crear un archivo `.env` en la raíz del proyecto y configurar la conexión a MongoDB de la siguiente manera:
   
   MONGO_URL=mongodb://127.0.0.1:27017/ecommerce

4. Asegurarse de que MongoDB se encuentre ejecutándose de forma local.

5. Iniciar la aplicación con el comando:
   
   npm run dev

6. Una vez iniciado el servidor, acceder desde el navegador a la siguiente URL para visualizar el listado de productos:
   
   http://localhost:8080/

7. Desde el listado de productos, se puede acceder al detalle de un producto ingresando a la ruta:
   
   http://localhost:8080/products/:pid

8. Para probar la funcionalidad en tiempo real, acceder a la siguiente ruta:
   
   http://localhost:8080/realtimeproducts

9. En la vista de productos en tiempo real se pueden agregar y eliminar productos utilizando Socket.IO, observando los cambios reflejados de manera inmediata sin necesidad de recargar la página.

10. Todos los productos agregados o eliminados se persisten correctamente en MongoDB y pueden verificarse directamente desde la base de datos.
