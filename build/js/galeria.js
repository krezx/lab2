document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    crearGaleriaPrimeraDivision(16);  // 16 equipos en Primera División
    crearGaleriaPrimeraB(16);         // 16 equipos en Primera B
    crearGaleriaSegundaDivision(14);  // 14 equipos en Segunda División
}

function crearGaleriaPrimeraDivision(cantidadEquipos) {
    const galeria = document.querySelector('.galeria-imagenes-primera');
    crearGaleriaEquipos(galeria, 'primera', cantidadEquipos);
}

function crearGaleriaPrimeraB(cantidadEquipos) {
    const galeria = document.querySelector('.galeria-imagenes-primeraB');
    crearGaleriaEquipos(galeria, 'primeraB', cantidadEquipos);
}

function crearGaleriaSegundaDivision(cantidadEquipos) {
    const galeria = document.querySelector('.galeria-imagenes-segunda');
    crearGaleriaEquipos(galeria, 'segunda', cantidadEquipos);
}

function crearGaleriaEquipos(galeria, division, cantidadEquipos) {
    for (let i = 1; i <= cantidadEquipos; i++) {
        const contenedorEquipo = document.createElement('div');
        contenedorEquipo.classList.add('contenedor-equipo');

        // Crear imagen del escudo (principal)
        const imagenEscudo = document.createElement('img');
        imagenEscudo.src = `build/img/${division}/${i}/escudo.jpg`;
        imagenEscudo.alt = `Escudo del equipo ${i} de la ${division}`;
        imagenEscudo.classList.add('imagen-principal');

        // Crear contenedor de imágenes (barra y plantel) que se mostrará al hacer hover
        const contenedorImagenesPrevias = document.createElement('div');
        contenedorImagenesPrevias.classList.add('contenedor-previas');

        const imagenBarra = document.createElement('img');
        imagenBarra.src = `build/img/${division}/${i}/barra.jpg`;
        imagenBarra.alt = `Barra del equipo ${i} de la ${division}`;
        imagenBarra.classList.add('imagen-previa');

        const imagenPlantel = document.createElement('img');
        imagenPlantel.src = `build/img/${division}/${i}/plantel.jpg`;
        imagenPlantel.alt = `Plantel del equipo ${i} de la ${division}`;
        imagenPlantel.classList.add('imagen-previa');

        // Agregar eventos de click para mostrar las imágenes en el modal
        imagenEscudo.onclick = () => mostrarGaleriaModal(i, cantidadEquipos, division);
        imagenBarra.onclick = () => mostrarGaleriaModal(i, cantidadEquipos, division);
        imagenPlantel.onclick = () => mostrarGaleriaModal(i, cantidadEquipos, division);

        // Agregar imágenes al contenedor de previas
        contenedorImagenesPrevias.appendChild(imagenBarra);
        contenedorImagenesPrevias.appendChild(imagenPlantel);

        // Agregar escudo y contenedor de imágenes previas al contenedor del equipo
        contenedorEquipo.appendChild(imagenEscudo);
        contenedorEquipo.appendChild(contenedorImagenesPrevias);

        // Agregar el contenedor del equipo a la galería
        galeria.appendChild(contenedorEquipo);
    }
}

function mostrarGaleriaModal(equipoId, totalEquipos, division) {
    const escudoSrc = `build/img/${division}/${equipoId}/escudo.jpg`;
    const barraSrc = `build/img/${division}/${equipoId}/barra.jpg`;
    const plantelSrc = `build/img/${division}/${equipoId}/plantel.jpg`;

    // Crear el overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Crear la imagen grande (inicialmente el escudo)
    const imagenGrande = document.createElement('img');
    imagenGrande.src = escudoSrc;
    imagenGrande.classList.add('imagen-grande');

    // Crear el contenedor de miniaturas
    const contenedorMiniaturas = document.createElement('div');
    contenedorMiniaturas.classList.add('contenedor-miniaturas');

    // Crear miniaturas para las otras imágenes
    const miniEscudo = document.createElement('img');
    miniEscudo.src = escudoSrc;
    miniEscudo.classList.add('miniatura');
    miniEscudo.onclick = () => cambiarImagenGrande(imagenGrande, escudoSrc);

    const miniBarra = document.createElement('img');
    miniBarra.src = barraSrc;
    miniBarra.classList.add('miniatura');
    miniBarra.onclick = () => cambiarImagenGrande(imagenGrande, barraSrc);

    const miniPlantel = document.createElement('img');
    miniPlantel.src = plantelSrc;
    miniPlantel.classList.add('miniatura');
    miniPlantel.onclick = () => cambiarImagenGrande(imagenGrande, plantelSrc);

    // Agregar las miniaturas al contenedor
    contenedorMiniaturas.appendChild(miniEscudo);
    contenedorMiniaturas.appendChild(miniBarra);
    contenedorMiniaturas.appendChild(miniPlantel);

    // Botón para cerrar el modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('boton-cerrar');

    // Evento para cerrar el modal
    cerrarModal.onclick = function() {
        cerrarGaleriaModal(overlay);
    };

    // Agregar flechas para navegar entre equipos
    const flechaIzquierda = document.createElement('div');
    flechaIzquierda.classList.add('flecha', 'izquierda');
    flechaIzquierda.innerHTML = '&#9664;'; // Flecha izquierda
    flechaIzquierda.onclick = () => {
        // Navegar al equipo anterior, con circularidad
        const nuevoEquipoId = equipoId === 1 ? totalEquipos : equipoId - 1;
        overlay.remove();
        mostrarGaleriaModal(nuevoEquipoId, totalEquipos, division);
    };

    const flechaDerecha = document.createElement('div');
    flechaDerecha.classList.add('flecha', 'derecha');
    flechaDerecha.innerHTML = '&#9654;'; // Flecha derecha
    flechaDerecha.onclick = () => {
        // Navegar al equipo siguiente, con circularidad
        const nuevoEquipoId = equipoId === totalEquipos ? 1 : equipoId + 1;
        overlay.remove();
        mostrarGaleriaModal(nuevoEquipoId, totalEquipos, division);
    };

    // Agregar la imagen grande, las miniaturas y el botón al overlay
    overlay.appendChild(imagenGrande);
    overlay.appendChild(contenedorMiniaturas);
    overlay.appendChild(flechaIzquierda);
    overlay.appendChild(flechaDerecha);
    overlay.appendChild(cerrarModal);

    // Agregar el overlay al body
    document.body.appendChild(overlay);

    // Activar la clase "active" para mostrar el modal con una transición suave
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10); // Timeout corto para permitir que la transición funcione

    // Fijar el body para que no se mueva mientras el modal está abierto
    document.body.classList.add('fijar-body');
}

function cambiarImagenGrande(imagenGrande, nuevaSrc) {
    // Transición suave: Primero baja la opacidad a 0
    imagenGrande.style.opacity = 0;

    // Esperar el tiempo de la transición antes de cambiar la imagen
    setTimeout(() => {
        imagenGrande.src = nuevaSrc; // Cambiar la fuente de la imagen
        imagenGrande.style.opacity = 1; // Volver a la opacidad original
    }, 500); // La duración de la transición debe coincidir con la duración del CSS (0.5s en este caso)
}

// Función para cerrar el modal con transición suave
function cerrarGaleriaModal(overlay) {
    overlay.classList.remove('active'); // Quitar la clase activa para iniciar la transición de cierre

    // Remover el modal después de que termine la transición
    setTimeout(() => {
        overlay.remove();
        document.body.classList.remove('fijar-body'); // Desbloquear el body después de cerrar el modal
    }, 500); // Debe coincidir con la duración de la transición CSS
}