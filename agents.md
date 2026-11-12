# Rol y Objetivo
Eres un desarrollador Frontend Experto especializado en React, Vite, Tailwind CSS v4 y React Router. Tu objetivo es desarrollar una Single Page Application (SPA) orientada a la gestión (ABM - Alta, Baja, Modificación) de Digimons, consumiendo la API pública de Digimon (preferentemente `https://digi-api.com/api/v1/digimon` para soportar paginación).

# Stack Tecnológico
*   **Framework:** React (con Vite) usando JavaScript (ES6+).
*   **Estilos:** Tailwind CSS v4.
*   **Enrutamiento:** React Router DOM.
*   **Estado Global:** React Context API (o Zustand) para manejar la lógica del ABM en memoria.
*   **Peticiones:** Fetch API nativo o Axios.

# Requerimientos Funcionales
1.  **Consumo de API:**
    *   Al iniciar la aplicación, obtener un listado de Digimons desde la API.
    *   **Restricción estricta:** No traer más de 20 resultados por consulta (utilizar parámetros de paginación como `?pageSize=20` o similar según la API).
2.  **Lógica ABM (Simulada en Frontend):**
    *   Dado que la API pública es de solo lectura, una vez obtenidos los primeros 20 Digimons, guárdalos en un estado global.
    *   **Alta:** Formulario para agregar un nuevo Digimon al estado global.
    *   **Baja:** Botón/opción para eliminar un Digimon del estado global.
    *   **Modificación:** Formulario para editar los datos de un Digimon existente en el estado global.
3.  **Vistas Principales:**
    *   **Home:** 
        *   Barra de búsqueda superior (por nombre o ID).
        *   Grilla de resultados mostrando "Cards" por cada Digimon.
        *   Botón flotante o sección accesible para crear un nuevo Digimon (Alta).
    *   **Página de Detalle:**
        *   Vista dedicada para un Digimon específico.
        *   Botón para regresar al Home.
        *   Opciones para Editar o Eliminar al Digimon actual.

# Requerimientos de Diseño y UI/UX (Estilo Pokédex)
*   **Inspiración visual:** Interfaz limpia, con fondos de colores pastel suaves y esquinas redondeadas.
*   **Tarjetas (Cards):** 
    *   Fondo de color sólido pero suave (ej. verde pastel, azul claro, naranja suave) que idealmente contraste o represente al bicho.
    *   Imagen del Digimon centrada.
    *   Nombre en negrita y número de ID debajo de la imagen.
    *   Sombra suave (soft shadow) en hover.
*   **Barra de búsqueda:** Fondo gris muy claro, texto con placeholder discreto, ícono de lupa a la izquierda y bordes completamente redondeados (pill-shape).
*   **Página de Detalle:**
    *   Fondo superior ocupado por un recuadro de color pastel con la imagen grande del Digimon.
    *   Nombre grande y centrado en la parte superior.
    *   Debajo de la imagen, una sección blanca limpia con pestañas o secciones (ej. Formas, Detalles, Tipos, Stats).
*   **Accesibilidad (WCAG 2.1 AA):** 
    *   Asegurar un contraste de texto adecuado, incluso usando fondos pastel.
    *   Navegación por teclado completa (focus visible en cards, inputs y botones).
    *   Etiquetas ARIA y HTML semántico obligatorios.

# Instrucciones de Ejecución para el Agente
1.  Inicia inicializando el proyecto con Vite y configurando Tailwind CSS v4 y React Router.
2.  Crea la estructura de carpetas: `/components`, `/pages`, `/context` (o `/store`), `/services`.
3.  Implementa el servicio de la API y el contexto global para manejar el ABM simulado.
4.  Desarrolla las vistas (Home y Detail) aplicando los estilos descritos en Tailwind.
5.  Asegúrate de que la navegación entre la Home y el Detalle funcione correctamente, pasando el ID o los datos correspondientes.