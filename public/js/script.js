function checkUser() {
  fetch("/checkUser")
    .then((response) => response.text())
    .then((data) => {
      const change = document.querySelector("#boton_cambio");
      if (data.includes("true")) {
        const logoutButton = document.createElement("a");
        logoutButton.classList.add("btn", "btn-sm");
        logoutButton.href = "/logout";
        logoutButton.id = "logout_button";
        logoutButton.textContent = "Salir";
        const perfilFlex = document.querySelector(".perfile-flex");
        perfilFlex.appendChild(logoutButton);
        change.textContent = "Perfil";
        change.href = "/profile";
      } else {
        change.textContent = "Iniciar Sesión";
      }
    })

    .catch((error) => {
      console.log("Error:", error);
    });
}
checkUser();
