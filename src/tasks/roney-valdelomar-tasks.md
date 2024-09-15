# Tareas de Actualización del Proyecto para Roney Valdelomar

## Leyenda de Estado de Tareas
- ✅ Completado
- 🔄 En progreso
- ⏳ Pendiente

## Tareas Generales

### 1. Actualizar la estructura de los controladores ✅
- Exportar directamente cada función HTTP.
- Evitar `export default`.
- Mantener solo funciones HTTP en el controlador.
- Mover lógica no HTTP a `utils` o `services`.

Ejemplo:

```javascript
// Antes
export default {
create: async (req, res) => { / ... / },
// ...
}
// Después
export const create = async (req, res) => { / ... / };
export const update = async (req, res) => { / ... / };
// ...
```

### 2. Manejo de errores ✅
- Estandarizar bloques try-catch.
- Definir mensajes de error específicos.
- Revisar códigos de estado HTTP.

Ejemplo:

```javascript
export const create = async (req, res) => {
try {
// Lógica de creación
} catch (error) {
if (error instanceof ValidationError) {
return res.status(400).json({ message: 'Datos inválidos', errors: error.errors });
}
res.status(500).json({ message: 'Error interno del servidor' });
}
};
```

### 3. Validaciones de modelos y datos de entrada ✅
- Revisar validaciones de atributos.
- Implementar validaciones reutilizables.
- Crear array de validaciones para controladores.

### 4. Soft delete y manejo de eliminación ✅
- Implementar soft delete.
- Crear función `destroy` con validación de estado.

### 5. Consultas a la base de datos ✅
- Reemplazar `findByPk` con `findOne`.
- Filtrar por estado en todas las operaciones.

### 6. Optimización de actualizaciones parciales ✅
- Crear función `updateField` en cada controlador.
- Usar hooks `beforeUpdate` cuando sea necesario.

### 7. Estandarización de respuestas HTTP ⏳
- Asegurar respuestas consistentes en JSON.
- Incluir encabezados relevantes.

## Tareas Específicas

### 1. Revisar atributos inmutables en el modelo ⏳
- Identificar atributos inmutables.
- Implementar lógica en PATCH para protegerlos.

### 2. Implementar validaciones en el PATCH ✅
- Validar estado antes de actualizar.
- Asegurar validación de datos.

### 3. Documentar el código ⏳
- Agregar comentarios JSDoc.
- Incluir comentarios explicativos.

Ejemplo:

```javascript
/**
 * Crea un nuevo usuario.
 * @param {Request} req - La solicitud HTTP.
 * @param {Response} res - La respuesta HTTP.
 * @returns {Promise<Response>} La respuesta con el usuario creado o un error.
 */
export const create = async (req: Request, res: Response): Promise<Response> => {
// Implementación...
};
```

### 4. Revisar lógica de negocio en cada controlador ⏳
- Verificar cumplimiento de reglas de negocio.
- Revisar relaciones entre modelos.

### 5. Mejorar gestión de imports y exports ✅
- Revisar imports y exports en controladores.
- Asegurar desacoplamiento de funciones.

## Ejemplo Detallado: Actualizar UserController

1. Implementar validaciones robustas ✅

```javascript
import { validateEmail, validatePassword } from '../utils/validation';
const userValidations = [
{ field: 'email', validator: validateEmail },
{ field: 'password', validator: validatePassword },
// ...
];
```


2. Usar `findOne` en lugar de `findByPk` ✅

```javascript
const user = await User.findOne({ where: { id, status: 'active' } });
```

3. Implementar soft delete ✅

```javascript
export const softDelete = async (req, res) => {
const { id } = req.params;
await User.update({ status: 'deleted' }, { where: { id } });
res.status(200).json({ message: 'Usuario marcado como eliminado' });
};
```

4. Proteger campos inmutables en PATCH ⏳

```javascript
const immutableFields = ['email', 'createdAt'];
const updateData = Object.keys(req.body)
.filter(key => !immutableFields.includes(key))
.reduce((obj, key) => ({ ...obj, [key]: req.body[key] }), {});
```

5. Agregar comentarios JSDoc a todas las funciones ⏳

## Tareas Adicionales

- Revisar lógica de actualización de archivos ⏳
- Mejorar validación en formularios ⏳

---

Para marcar una tarea como completada, cambia el emoji correspondiente de ⏳ a ✅. Para tareas en progreso, usa 🔄.

