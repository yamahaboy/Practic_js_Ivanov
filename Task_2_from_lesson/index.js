let data = [];
let cardId = null;

const submitBtn = document.querySelector("#submitBtn");
const todoList = document.querySelector("#todo-list");
const closeBtn = document.querySelector("#closeBtn");
const editBtn = document.querySelector("#editBtn");
const modalWrapper = document.querySelector(".modalWrapper");

modalWrapper.addEventListener("click", (event) => {
  if (!event.target.closest(".modal")) {
    modalWrapper.style.display = "none";
  }
});

closeBtn.addEventListener("click", () => {
  modalWrapper.style.display = "none";
});

editBtn.addEventListener("click", () => {
  const editTitle = document.querySelector("#editTitle");
  const editDescription = document.querySelector("#editDescription");

  const cardIndex = data.findIndex((item) => item.id === cardId);

  data.splice(cardIndex, 1, {
    id: cardId,
    title: editTitle.value,
    description: editDescription.value,
  });

  modalWrapper.style.display = "none";
  drawList();
});

const drawList = () => {
  todoList.innerHTML = "";

  data.forEach((item, index) => {
    todoList.innerHTML += `
      <li class='card' id=${item.id} >
        <p>#: ${index + 1}</p>
        <p>Title: ${item.title}</p>
        <p>Description: ${item.description}</p>
        <div><button class="delete">DELETE</button></div>
        <div><button class="edit">EDIT</button></div>
      </li>`;
  });
};

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const todoItem = {
    id: Date.now(),
    title: title.value,
    description: description.value,
  };

  data.push(todoItem);
  drawList();
});

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const li = event.target.closest(".card");
    const userId = li.id;

    data = data.filter((item) => item.id !== +userId);
    drawList();
  }

  if (event.target.classList.contains("edit")) {
    modalWrapper.style.display = "block";
    cardId = +event.target.closest(".card").id;
    const card = data.find((item) => item.id === cardId);

    const editTitle = document.querySelector("#editTitle");
    const editDescription = document.querySelector("#editDescription");

    editTitle.value = card.title;
    editDescription.value = card.description;
  }
});