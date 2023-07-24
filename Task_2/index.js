let data = [];
let toDoTable;
let currentToDoId = null;

const drawToDo = (data, toDoTable) => {
  toDoTable.innerHTML = "";

  data.forEach((item) => {
    toDoTable.innerHTML += `
      <li class='toDo-card' id="${item.id}">
        <div class="text-block">
          <div>Title: ${item.title}</div>
          <div>Description: ${item.description}</div>
        </div>
        <div class="button-block">
          <div><button class="edit-card" id="edit-${item.id}">Edit</button></div>
          <div><button class="delete-card">DELETE</button></div>
        </div>
      </li>`;
  });
};

const submitHandler = () => {
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");

  const titleError = document.querySelector("#title-error");
  const descriptionError = document.querySelector("#description-error");

  titleError.textContent = "";
  descriptionError.textContent = "";

  let isValid = true;

  if (title.value.trim() === "") {
    titleError.textContent = "* Invalid input data";
    isValid = false;
  }

  if (description.value.trim() === "") {
    descriptionError.textContent = "* Invalid input data";
    isValid = false;
  }

  if (!isValid) {
    return null;
  }

  const toDo = {
    id: Date.now(),
    title: title.value,
    description: description.value,
  };

  title.value = "";
  description.value = "";

  return toDo;
};

const deleteHandler = (event) => {
  if (event.target.classList.contains("delete-card")) {
    const li = event.target.closest(".toDo-card");
    const toDoId = +li.id;
    data = data.filter((item) => item.id !== toDoId);
    drawToDo(data, toDoTable);
  }
};

const openModal = (toDoId) => {
  currentToDoId = toDoId;
  const modal = document.querySelector("#editModal");
  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.querySelector("#editModal");
  modal.style.display = "none";
};

const showModal = (title, description) => {
  const editTitle = document.querySelector("#editTitle");
  const editDescription = document.querySelector("#editDescription");

  editTitle.value = title;
  editDescription.value = description;
};

const init = () => {
  toDoTable = document.querySelector("#toDo-table");

  const submitBtn = document.querySelector("#submitBtn");
  const editSubmitBtn = document.querySelector("#editSubmitBtn");

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const toDo = submitHandler();
    if (toDo) {
      data.push(toDo);
      drawToDo(data, toDoTable);
    }
  });

  toDoTable.addEventListener("click", (event) => {
    deleteHandler(event);
    if (event.target.classList.contains("edit-card")) {
      const li = event.target.closest(".toDo-card");
      const toDoId = +li.id;
      const toDo = data.find((item) => item.id === toDoId);
      showModal(toDo.title, toDo.description);
      openModal(toDoId);
    }
  });

  editSubmitBtn.addEventListener("click", () => {
    const editTitle = document.querySelector("#editTitle").value;
    const editDescription = document.querySelector("#editDescription").value;

    const toDoItem = data.find((item) => item.id === currentToDoId);

    if (toDoItem) {
      toDoItem.title = editTitle;
      toDoItem.description = editDescription;
      drawToDo(data, toDoTable);
      closeModal();
    }
  });
};

init();
