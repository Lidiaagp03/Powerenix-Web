# Powerenix: web estática

Para verla, haz doble clic en `index.html`. No hace falta instalar nada ni compilar.

## Qué hay en la carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html`, `nosotros.html`, `gimnasio.html`, `tienda.html`, `ropa.html`, `contacto.html` | Las páginas |
| `aviso-legal.html`, `privacidad.html`, `cookies.html` | Las páginas legales |
| `css/styles.css` | Todos los estilos (incluidos los colores, al principio del archivo, en `:root`) |
| `js/main.js` | Menú móvil, pestañas, filtro de la tienda, reseñas, formularios, cookies y animaciones |
| `images/` | Logos y fotos |

## Cómo editar

1. **Textos:** abre el `.html` con un editor (VS Code, Notepad++...), busca la frase y cámbiala.
2. **Teléfono, email, dirección u horario:** se repiten en todas las páginas, porque la cabecera y el pie van en cada una. Usa "Buscar y reemplazar en archivos" (en VS Code: `Ctrl + Shift + H`).
3. **Correo de los formularios:** cámbialo en `js/main.js`, en la línea `const EMAIL = ...`.
4. **Fotos:** sustituye el archivo en `images/` manteniendo el mismo nombre. Si usas otro nombre, cambia el `src="images/..."` en el HTML.
5. **Colores:** en `css/styles.css`, busca `--primary` (el naranja) y `--background` (el fondo).
6. **Productos de la tienda:** copia un bloque `<div ... data-category="Snacks">` completo en `tienda.html`. El filtro funciona con el valor de `data-category`.
7. **Clases del gimnasio:** cada día es un bloque `data-panel="Lunes"`, `data-panel="Martes"`... en `gimnasio.html`.
8. **Reseñas:** cada reseña es un bloque `data-review` en `index.html`.

## Aviso sobre las clases de estilo

Los estilos se generaron a partir de las clases que ya usa la web (`text-primary`, `mt-4`, etc.). Puedes reutilizar cualquier clase que ya aparezca en las páginas. Una clase que no exista en ninguna parte no tendrá efecto, salvo que añadas su CSS a mano en `css/styles.css`.
