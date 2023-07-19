const drawUsers = (data, userTable) => {
  userTable.innerHTML = `<thead>
      <tr>
        <td>#</td>
        <td>Name</td>
        <td>Surname</td>
        <td>Age</td>
      </tr>
    </thead>
    `;

  data.forEach((item, index) => {
    userTable.innerHTML += `
        <tbody>
        <tr class="users" id="${item.id}" >
        <td>#${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.surname}</td>
        <td>${item.age}</td>
        </tr>
        </tbody>
        `;
  });

  const deleteAllBtn = document.querySelector("#delete-all-btn");
  deleteAllBtn.style.display = "block";
};
const submitHandler = () => {
  const name = document.querySelector("#name");
  const surname = document.querySelector("#surname");
  const age = document.querySelector("#age");

  const nameError = document.querySelector("#name-error");
  const surnameError = document.querySelector("#surname-error");
  const ageError = document.querySelector("#age-error");

  nameError.textContent = "";
  surnameError.textContent = "";
  ageError.textContent = "";

  let isValid = true;

  switch (true) {
    case name.value.trim() === "":
      nameError.textContent = "* Invalid input data";
      isValid = false;
      break;

    case surname.value.trim() === "":
      surnameError.textContent = "* Invalid input data";
      isValid = false;
      break;

    case age.value.trim() === "":
      ageError.textContent = "* Invalid input data.";
      isValid = false;
      break;
  }

  if (!isValid) {
    return null;
  }

  const user = {
    id: Date.now(),
    name: name.value,
    surname: surname.value,
    age: age.value,
  };
  return user;
};

const init = () => {
  let data = [];
  const submitBtn = document.querySelector("#submitBtn");
  const userTable = document.querySelector("#user-table");
  const deleteAllBtn = document.querySelector("#delete-all-btn button");

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const user = submitHandler();
    if (user) {
      data.push(user);
      drawUsers(data, userTable);
    }
  });

  deleteAllBtn.addEventListener("click", () => {
    data = [];
    drawUsers(data, userTable);
  });
};

init();
