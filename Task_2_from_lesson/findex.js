const toggleModal = () => {
    const modalWrapper = document.querySelector(".modalWrapper");
    modalWrapper.classList.toggle("toggleModal");
  };
  
  const drawList = (data) => {
    const todoList = document.querySelector("#todo-list");
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
  
  const submitHandler = (event, data) => {
    event.preventDefault();
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
  
    data.push({
      id: Date.now(),
      title: title.value,
      description: description.value,
    });
    drawList(data);
  };
  
  const deleteHandler = (event, data) => {
    const cardId = +event.target.closest(".card").id;
    const cardIndex = data.findIndex((item) => item.id === cardId);
  
    data.splice(cardIndex, 1);
    drawList(data);
  };
  
  const editHandler = (event, data) => {
    const editTitle = document.querySelector("#editTitle");
    const editDescription = document.querySelector("#editDescription");
    const editBtn = document.querySelector("#editBtn");
  
    const cardId = +event.target.closest(".card").id;
    const card = data.find((item) => item.id === cardId);
  
    editTitle.value = card.title;
    editDescription.value = card.description;
  
    toggleModal();
  
    const editBtnHandler = () => {
      const cardIndex = data.findIndex((item) => item.id === cardId);
  
      data.splice(cardIndex, 1, {
        id: cardId,
        title: editTitle.value,
        description: editDescription.value,
      });
  
      toggleModal();
      drawList(data);
  
      editBtn.removeEventListener("click", editBtnHandler);
    };
  
    editBtn.addEventListener("click", editBtnHandler);
  };
  
  const init = () => {
    let data = [];
    const submitBtn = document.querySelector("#submitBtn");
    const closeBtn = document.querySelector("#closeBtn");
    const todoList = document.querySelector("#todo-list");
  
    submitBtn.addEventListener("click", (event) => {
      submitHandler(event, data);
    });
  
    closeBtn.addEventListener("click", () => {
      toggleModal();
    });
  
    todoList.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete")) {
        deleteHandler(event, data);
      }
  
      if (event.target.classList.contains("edit")) {
        editHandler(event, data);
      }
    });
  };
  
  init();
  