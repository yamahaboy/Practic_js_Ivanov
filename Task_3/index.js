const drawUsers = (data, personalTable) => {
  personalTable.innerHTML = ``;
  data.forEach((item) => {
    personalTable.innerHTML += `
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
  const deletePersonBtn = document.querySelector("#deletePerson");
  deletePersonBtn.style.display = "block";
  const editPersonBtn = document.querySelector("#editPerson");
  editPersonBtn.style.display = "block";
};

const submitHandler = () => {
  const form = document.querySelector("#pesonal-form");
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

  form.reset();

  let data = getDataFromLocalStorage();
  data.push(person);
  saveDataToLocalStorage(data);

  return person;
};

const sortBySalary = (data, currentSortOrder) => {
  data.sort((a, b) => {
    if (currentSortOrder === "asc") {
      return b.salary - a.salary;
    } else {
      return a.salary - b.salary;
    }
  });
};

const sortByWorkDate = (data, currentSortOrder) => {
  return data.slice().sort((a, b) => {
    const dateA = new Date(a.wordDate);
    const dateB = new Date(b.wordDate);

    if (currentSortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
};

const toggleModal = (data, card) => {
  const modalWrapper = document.querySelector(".modalWrapper");
  modalWrapper.classList.toggle("toggleModal");

  const editBtn = document.querySelector("#editBtn");
  editBtn.removeEventListener("click", editBtnHandler);
  editBtn.addEventListener("click", () => editBtnHandler(data, card));
};

const editBtnHandler = (data, card) => {
  const personalTable = document.querySelector("#table-body");
  const cardIndex = data.findIndex((item) => item.id === card.id);

  data.splice(cardIndex, 1, {
    id: card.id,
    name: editName.value,
    surname: editSurname.value,
    salary: editSalary.value,
    wordDate: editWordDate.value,
  });

  toggleModal(data, card);
  drawUsers(data, personalTable);
  saveDataToLocalStorage(data);
};

const getSelectedPersonId = (personalTable) => {
  const checkboxes = personalTable.querySelectorAll(
    ".users input[type='checkbox']:checked"
  );
  let selectedCardId = null;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedCardId = +checkbox.closest(".users").id;
    }
  });

  return selectedCardId;
};

const deletePersons = (data, personalTable) => {
  const checkboxes = personalTable.querySelectorAll(
    "tbody .users input[type='checkbox']"
  );

  const rowsToDelete = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const row = checkbox.closest(".users");
      rowsToDelete.push(row);
    }
  });

  rowsToDelete.forEach((row) => {
    const id = row.getAttribute("id");
    data = data.filter((person) => person.id !== parseInt(id));
  });

  saveDataToLocalStorage(data);

  return data;
};

const getDataFromLocalStorage = () => {
  const dataLocalStorage = localStorage.getItem("data");
  return JSON.parse(dataLocalStorage) || [];
};

const saveDataToLocalStorage = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
const showBanner = () => {
  const banner = document.getElementById("banner");
  banner.classList.remove("hide");
  setTimeout(() => {
    banner.classList.add("hide");
  }, 5000);
};

const init = () => {
  let data = getDataFromLocalStorage();
  let currentSortOrder = "asc";
  const submitBtn = document.querySelector("#submitBtn");
  const personalTable = document.querySelector("#table-body");
  const thead = document.querySelector("#thead");
  const deleteAllBtn = document.querySelector("#deleteAllBtn");
  const deletePersonBtn = document.querySelector("#deletePerson");
  const closeBtn = document.querySelector("#closeBtn");
  const editPersonBtn = document.querySelector("#editPerson");
  const sortBySalaryBtn = document.querySelector("#sortBySalary");
  const sortByWorkDateBtn = document.querySelector("#sortByWorkDate");

  drawUsers(data, personalTable, currentSortOrder);

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const person = submitHandler();
    if (person) {
      data.push(person);
      drawUsers(data, personalTable);
    }
  });

  sortBySalaryBtn.addEventListener("click", () => {
    currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    sortBySalary(data, currentSortOrder);
    drawUsers(data, personalTable, currentSortOrder);
    sortBySalaryBtn.classList.toggle("asc");
  });

  sortByWorkDateBtn.addEventListener("click", () => {
    currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    data = sortByWorkDate(data, currentSortOrder);
    drawUsers(data, personalTable, currentSortOrder);
    sortByWorkDateBtn.classList.toggle("asc");
  });

  thead.addEventListener("click", (event) => {
    console.log(event.target.matches("#sortBySalary"));
    if (event.target.matches("#sortBySalary")) {
      currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";

      sortBySalary(data, currentSortOrder);
      console.log(data);
      drawUsers(data, personalTable);
    }
    if (event.target.matches("#sortByWorkDate")) {
      currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";

      data = sortByWorkDate(data, currentSortOrder);
      drawUsers(data, personalTable);
    }
  });

  deleteAllBtn.addEventListener("click", () => {
    data = [];
    drawUsers(data, personalTable);
    saveDataToLocalStorage(data);
  });

  deletePersonBtn.addEventListener("click", () => {
    data = deletePersons(data, personalTable);
    drawUsers(data, personalTable);
  });

  editPersonBtn.addEventListener("click", () => {
    const checkboxes = [
      ...personalTable.querySelectorAll(
        ".users input[type='checkbox']:checked"
      ),
    ];

    if (checkboxes.length > 1) {
      alert("Please select one person to edit.");
      return;
    }
    let selectedCheckboxCount = null;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedCheckboxCount++;
      }
    });

    if (selectedCheckboxCount !== 1) {
      alert("Please select one person to edit.");
      return;
    }

    const cardId = getSelectedPersonId(personalTable);
    const card = data.find((item) => item.id === cardId);

    toggleModal(data, card);

    editName.value = card.name;
    editSurname.value = card.surname;
    editSalary.value = card.salary;
    editWordDate.value = card.wordDate;
  });

  personalTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit")) {
      editHandler(event, data);
    }
  });

  closeBtn.addEventListener("click", () => {
    toggleModal();
  });
};

window.onload = () => {
  showBanner();
  init();
};
