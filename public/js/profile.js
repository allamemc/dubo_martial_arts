fetch("/profileinfo")
  .then((response) => response.json())
  .then((data) => {
    const username = document.querySelector("#tu_nombre");
    username.textContent = "Hola " + data.username;
  })
  .catch((error) => {
    // Handle any errors here
  });
