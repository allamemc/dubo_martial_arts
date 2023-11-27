function checkUser() {
  fetch("/checkUser")
    .then((response) => response.text())
    .then((data) => {
      const change = document.querySelector("#boton_cambio");
      const comenzar = document.querySelector("#comenzar_boton");
      if (data.includes("true")) {
        const logoutButton = document.createElement("a");
        logoutButton.classList.add(
          "text-3xl",
          "text-white",
          "btn",
          "btn-ghost",
          "btn-circle",
          "bg-primary"
        );
        logoutButton.href = "/logout";
        logoutButton.id = "logout_button";
        logoutButton.innerHTML = "<ion-icon name='log-out'></ion-icon>";
        const perfilFlex = document.querySelector(".perfile-flex");
        perfilFlex.appendChild(logoutButton);
        change.innerHTML = "<ion-icon name='person-circle-outline'></ion-icon>";
        change.href = "/profile";
        comenzar.textContent = "Ver Clases";
        comenzar.href = "/profile";
      } else {
        change.classList.remove(
          "btn-circle",
          "text-3xl",
          "bg-primary",
          "btn-ghost",
          "text-white"
        );
        change.classList.add("btn-sm");
        change.textContent = "Iniciar Sesión";
      }
    })

    .catch((error) => {
      console.log("Error:", error);
    });
}
checkUser();
