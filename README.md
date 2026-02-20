# Technical Test – Orders Management System

Live Demo:
[https://d1lkfb5be7ck32.cloudfront.net](https://d1lkfb5be7ck32.cloudfront.net)

---

## Descripción General

Aplicación full-stack para la gestión de órdenes y productos, cumpliendo la mayoría de los requerimientos solicitados en el enunciado.

Permite:

* Crear, editar y eliminar órdenes
* Agregar, editar y eliminar productos dentro de una orden
* Calcula automáticamente:
  * Número de productos
  * Precio final
* Cambiar el estado de una orden (Pending, InProgress, Completed)
* Restringir modificaciones cuando la orden está en estado Completed

---

## Arquitectura y Tecnologías

### Frontend

* React
* TypeScript
* Organización basada en features (`orders` y `products`)
* Separación clara entre componentes, hooks y lógica de negocio
* Variables sensibles gestionadas mediante archivos `.env`
* Deploy en Amazon S3
* Distribución y HTTPS mediante AWS CloudFront

### Backend

* Node.js
* Express
* TypeScript
* Separación de rutas por dominio:

  * `orders` routes
  * `products` routes
* Uso de variables de entorno (`.env`) para configuración (URL de base de datos, keys)
* Deploy en AWS Elastic Beanstalk
* Acceso HTTPS mediante CloudFront
* Uso de transacciones en operaciones de POST ya que se modificaban varias tablas y se necesitaba un rollback por seguridad.

### Base de Datos

* Supabase (PostgreSQL)
* Modelo relacional con:

  * orders
  * products
  * order_products

---

## Notas

Se consideró implementar el backend utilizando Python con Django como alternativa, pero debido al tiempo disponible se optó por Express con TypeScript para avanzar más rápido en la implementación completa.

---

## Posibles Mejoras

### UX

- Implementar mecanismos como debounce o deshabilitar botones durante solicitudes activas para evitar múltiples envíos accidentales.
- Prevenir la creación de registros duplicados cuando el usuario realiza múltiples clics antes de recibir respuesta del servidor.

### Responsive Design

* El header podría ocultarse en pantallas pequeñas y mostrarse mediante un sidebar o menú tipo drawer.
* Optimización de tablas para dispositivos móviles (disminuir headers menos importantes u ordenar en pantallas mas pequeñas).

### Seguridad

* Implementar rate limiting por IP o por sesión, ya que actualmente no existe autenticación ni control de acceso.
* Añadir validaciones adicionales en backend para evitar eliminación de productos que estén asociados a órdenes no completadas.

### Robustez y Escalabilidad

* Implementación de tests automatizados.
* Logging estructurado y monitoreo.

---

## Estado del Proyecto

La mayoría de las funcionalidades solicitadas en la prueba técnica fueron implementadas, incluyendo:

* Gestión completa de órdenes
* Gestión de productos dentro de órdenes
* Cálculos automáticos
* Cambio de estado de órdenes
* Validaciones para órdenes completadas
* Despliegue completo en la nube (frontend y backend con HTTPS)
