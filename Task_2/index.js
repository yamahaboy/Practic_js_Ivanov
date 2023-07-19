const drawToDO = (data, toDOTable) => {
  toDOTable.innerHTML = "";

  data.forEach((item) => {
    toDOTable.innerHTML += `
    <li class='toDo-card'id="${item.id}">
    <div>Title:${item.title}</div>
    <div>Description:${item.description}</div>
    <div><button class="edit-card">Edit</button></div>
    <div><button class="delete-card">DELETE</button></div>
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
  const li = event.target.closest(".toDo-card");
  const toDo = +li.id;

  const newData = data.filter((item) => item.id !== toDo);

  return newData;
};

const init = () => {
  let data = [];
  const submitBtn = document.querySelector("#submitBtn");
  const toDOTable = document.querySelector("#toDo-table");

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const user = submitHandler();
    if (user) {
      data.push(user);
      drawToDO(data, toDOTable);
    }
  });

  toDOTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-card")) {
      const newData = deleteHandler(event, data);

      data = newData;

      drawToDO(data, toDOTable);
    }
  });
};

init();
