// BEGIN: Check if password_error is present in the URL
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (
    urlParams.has("password_error") &&
    urlParams.get("password_error") === "true"
  ) {
    // Do something if password_error=true
    const alertContainer = document.getElementById("alerta_container");
    const alertElement = document.createElement("div");
    alertElement.setAttribute("role", "alert");
    alertElement.setAttribute("class", "alert alert-warning");
    alertElement.setAttribute("style", "width: 100%; max-width: 450px");

    const iconElement = document.createElement("ion-icon");
    iconElement.setAttribute("name", "alert-circle-outline");
    iconElement.setAttribute("style", "font-size: 20px");

    const spanElement = document.createElement("span");
    spanElement.textContent = "Email o Contraseña inválidos!";

    alertElement.appendChild(iconElement);
    alertElement.appendChild(spanElement);

    alertContainer.appendChild(alertElement);
  } else if (
    urlParams.has("not_found") &&
    urlParams.get("not_found") === "true"
  ) {
    const alertContainer = document.getElementById("alerta_container");
    const alertElement = document.createElement("div");
    alertElement.setAttribute("role", "alert");
    alertElement.setAttribute("class", "alert alert-error bg-primary");
    alertElement.setAttribute("style", "width: 100%; max-width: 450px");

    const iconElement = document.createElement("ion-icon");
    iconElement.setAttribute("name", "sad-outline");
    iconElement.setAttribute("style", "font-size: 20px");

    const spanElement = document.createElement("span");
    spanElement.innerHTML = `Usuario no existe, ¿desea <a href="/register" class="underline">registrarse</a>?`;

    alertElement.appendChild(iconElement);
    alertElement.appendChild(spanElement);

    alertContainer.appendChild(alertElement);
  } else if (
    urlParams.has("existing") &&
    urlParams.get("existing") === "true"
  ) {
    const alertContainer = document.getElementById("alerta_container");
    const alertElement = document.createElement("div");
    alertElement.setAttribute("role", "alert");
    alertElement.setAttribute("class", "alert alert-info");
    alertElement.setAttribute("style", "width: 100%; max-width: 450px");

    const iconElement = document.createElement("ion-icon");
    iconElement.setAttribute("name", "alert-circle-outline");
    iconElement.setAttribute("style", "font-size: 20px");

    const spanElement = document.createElement("span");
    spanElement.innerHTML = `Usuario existente, por favor <a href="/login" class="underline">inicie sesión</a>`;

    alertElement.appendChild(iconElement);
    alertElement.appendChild(spanElement);

    alertContainer.appendChild(alertElement);
  }
});
