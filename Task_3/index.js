const drawUsers = (data, pesonalTable) => {
  pesonalTable.innerHTML = `<thead>
        <tr>
          <td> </td>
          <td>Name</td>
          <td>Surname</td>
          <td>Salary<button id="sortBySalary">Sort</button></td>
          <td>Date of work start:</td>
        </tr>
      </thead>
      `;

  data.sort((a, b) => (a.salary > b.salary ? 1 : -1));

  data.forEach((item) => {
    pesonalTable.innerHTML += `
          <tbody>
          <tr class="users" id="${item.id}" >
          <td><input type="checkbox" id="check"/> </td>
          <td>${item.name}</td>
          <td>${item.surname}</td>
          <td>${item.salary}$</td>
          <td>${item.wordDate}</td>
          </tr>
          </tbody>
          `;
  });
  const deleteAllBtn = document.querySelector("#deleteAllBtn");
  deleteAllBtn.style.display = "block";
};

const submitHandler = () => {
  const name = document.querySelector("#name");
  const surname = document.querySelector("#surname");
  const salary = document.querySelector("#salary");
  const wordDate = document.querySelector("#wordDate");

  const nameError = document.querySelector("#name-error");
  const surnameError = document.querySelector("#surname-error");
  const salaryError = document.querySelector("#salary-error");
  const wordDateError = document.querySelector("#wordDate-error");

  nameError.textContent = "";
  surnameError.textContent = "";
  salaryError.textContent = "";
  wordDateError.textContent = "";

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

    case salary.value.trim() === "":
      salaryError.textContent = "* Invalid input data.";
      isValid = false;
      break;
    case wordDate.value.trim() === "":
      wordDateError.textContent = "* Invalid input data.";
      isValid = false;
      break;
  }

  if (!isValid) {
    return null;
  }

  const person = {
    id: Date.now(),
    name: name.value,
    surname: surname.value,
    salary: salary.value,
    wordDate: wordDate.value,
  };
  return person;
};
const init = () => {
  let data = [];
  const submitBtn = document.querySelector("#submitBtn");
  const pesonalTable = document.querySelector("#pesonal-table");
  const deleteAllBtn = document.querySelector("#deleteAllBtn");
  const sortBySalary = document.getElementById("sortBySalary");

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const person = submitHandler();
    if (person) {
      data.push(person);
      drawUsers(data, pesonalTable);
    }
  });

  sortBySalary.addEventListener("click", () => {
    data.sort((a, b) => (a.salary > b.salary ? 1 : -1));
    drawUsers(data, pesonalTable);
  });
  deleteAllBtn.addEventListener("click", () => {
    data = [];
    drawUsers(data, pesonalTable);
  });
};

init();

  
  
  