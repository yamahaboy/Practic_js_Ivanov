let data = [];
const drawToDo = (data, toDoTable) => {
  toDoTable.innerHTML = "";

  data.forEach((item) => {
    toDoTable.innerHTML += `
    <li class='toDo-card'id="${item.id}">
    <div class="text-block">
    <div>Title:${item.title}</div>
    <div>Description:${item.description}</div>
    </div>
    <div class="button-block">
    <div><button class="edit-card" id="edit-card">Edit</button></div>
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

  switch (true) {
    case title.value.trim() === "":
      titleError.textContent = "* Invalid input data";
      isValid = false;
      break;

    case description.value.trim() === "":
      descriptionError.textContent = "* Invalid input data";
      isValid = false;
      break;
  }

  if (!isValid) {
    return null;
  }

  const toDO = {
    id: Date.now(),
    title: title.value,
    description: description.value,
  };
  return toDO;
};

const deleteHandler = (event, data) => {
  if (event.target.classList.contains("delete-card")) {
    const li = event.target.closest(".toDo-card");
    const toDoId = +li.id;
    const newData = data.filter((item) => item.id !== toDoId);
    return newData;
  }
  return data;
};

const openModal = () => {
  const modal = document.querySelector("#editModal");
  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.querySelector("#editModal");
  modal.style.display = "none";
};

const populateModalFields = (title, description) => {
  const editTitle = document.querySelector("#editTitle");
  const editDescription = document.querySelector("#editDescription");

  editTitle.value = title;
  editDescription.value = description;
};

const editHandler = (event, data, toDoTable) => {
  if (event.target.classList.contains("edit-card")) {
    const li = event.target.closest(".toDo-card");
    const toDoId = +li.id;
    const selectedItem = data.find((item) => item.id === toDoId);
    if (selectedItem) {
      openModal();
      populateModalFields(selectedItem.title, selectedItem.description);

      const editSubmitBtn = document.querySelector("#editSubmitBtn");
      editSubmitBtn.addEventListener("click", () => {
        const editedTitle = document.querySelector("#editTitle").value;
        const editedDescription =
          document.querySelector("#editDescription").value;
        const editedData = data.map((item) =>
          item.id === toDoId
            ? { ...item, title: editedTitle, description: editedDescription }
            : item
        );
        data = editedData;
        drawToDo(data, toDoTable);
        closeModal();
      });
    }
  }
};

const init = () => {
  // let data = [];
  const submitBtn = document.querySelector("#submitBtn");
  const toDoTable = document.querySelector("#toDo-table");

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const user = submitHandler();
    if (user) {
      data.push(user);
      drawToDo(data, toDoTable);
    }
  });

  toDoTable.addEventListener("click", (event) => {
    const newData = deleteHandler(event, data);
    data = newData;
    drawToDo(data, toDoTable);
    editHandler(event, data, toDoTable);
  });
};

init();
