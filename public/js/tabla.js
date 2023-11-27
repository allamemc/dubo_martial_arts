// Obtener el div contenedor de la tabla

// Realizar el fetch para obtener los datos de las clases
fetch("/clases")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Hubo un problema al obtener los datos de las clases.");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    // Crear el encabezado de la tabla con los días de la semana en español
    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const tabla = document.createElement("table");
    tabla.classList.add("table");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    diasSemana.forEach((dia) => {
      const th = document.createElement("th");
      th.textContent = dia;
      tr.appendChild(th);
    });

    // Crear el cuerpo de la tabla con los datos de las clases
    const tbody = document.createElement("tbody");
    const clases = data;

    const tablaContainer = document.getElementById("tabla_clases");
    thead.appendChild(tr);
    tabla.appendChild(thead);
    tablaContainer.appendChild(tabla);

    // Crear la primera fila con 5 columnas
    const primeraFila = document.createElement("tr");
    const karateClases = clases.filter((clase) => clase.nombre === "Karate");

    for (let i = 0; i < 5; i++) {
      const td = document.createElement("td");

      if (i === 1 || i === 3) {
        const enlace = document.createElement("a");
        enlace.classList.add("clase");
        const karateClase = karateClases.shift();
        if (karateClase) {
          enlace.href = `/clases/${karateClase._id}`;
          enlace.innerHTML =
            `<div>${karateClase.hora}</div>` +
            `<div>${karateClase.nombre}</div>`;
          td.appendChild(enlace);
        } else {
          td.removeChild(enlace);
        }
      }
      primeraFila.appendChild(td);
    }

    const segundafila = document.createElement("tr");
    const boxingClases = clases.filter((clase) => clase.nombre === "Boxeo");

    for (let i = 0; i < 5; i++) {
      const td = document.createElement("td");

      if (i === 0 || i === 2 || i === 4) {
        const enlace = document.createElement("a");
        enlace.classList.add("clase", "boxe");
        const BoxingClase = boxingClases.shift();
        if (BoxingClase) {
          enlace.href = `/clases/${BoxingClase._id}`;
          enlace.innerHTML =
            `<div>${BoxingClase.hora}</div>` +
            `<div>${BoxingClase.nombre}</div>`;
          td.appendChild(enlace);
        } else {
          td.removeChild(enlace);
        }
      }
      segundafila.appendChild(td);
    }

    const tercerafila = document.createElement("tr");
    const muayClases = clases.filter((clase) => clase.nombre === "Muay Thai");

    for (let i = 0; i < 5; i++) {
      const td = document.createElement("td");

      if (i === 1 || i === 3 || i === 4) {
        const enlace = document.createElement("a");
        enlace.classList.add("clase", "thai");
        const muayclase = muayClases.shift();
        if (muayclase) {
          enlace.href = `/clases/${muayclase._id}`;
          enlace.innerHTML =
            `<div>${muayclase.hora}</div>` + `<div>${muayclase.nombre}</div>`;
          td.appendChild(enlace);
        } else {
          td.removeChild(enlace);
        }
      }
      tercerafila.appendChild(td);
    }

    tbody.appendChild(primeraFila);
    tbody.appendChild(segundafila);
    tbody.appendChild(tercerafila);
    tabla.appendChild(tbody);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
