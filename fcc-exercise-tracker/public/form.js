const form = document.querySelector("#exercise-form");

form.addEventListener("submit", () => {
  const id = form.querySelector("#id-input"); 

  form.action = `/api/users/${id.value}/exercises`;
  form.submit();
});