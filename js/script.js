{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: true },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
    };

    const markAllDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };
    
    const showOrHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
      };


    const bindEvents = () => {
        const removeButtons = document.querySelectorAll('.js-remove');

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll('.js-done');

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
                type="none" 
                class="list__items
                ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
                <button 
                class="js-done list__button">
                ${task.done ? "✔" : ""}
                </button>
                <span 
                class="list__item${task.done ? " list__item--done" : ""}">
                ${task.content}
                </span> 
                <button 
                class="js-remove list__button list__button--remove">
                🗑
                </button>
            </li>
            `;

        }

        document.querySelector(".js-tasks").innerHTML = htmlString

        bindEvents();
        renderButtons();
        bindToggleDoneEvents();

    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");
      
        if (tasks.length > 0) {
          buttonsElement.innerHTML = `<button class="js-toggleShowHide buttons__button">${
            hideDoneTasks ? "Pokaż" : "Ukryj"
          } ukończone</button>
          <button class="js-allDoneTask buttons__button" ${
            tasks.every(({ done }) => done) ? "disabled" : ""
          } >Ukończ wszystkie</button>`;
        } else {
          buttonsElement.innerHTML = ``;
        }
      };

      const bindToggleDoneEvents = () => {
  
        const toggleShowHideButton = document.querySelector(".js-toggleShowHide");
      
        if (toggleShowHideButton) {
          toggleShowHideButton.addEventListener("click", showOrHideDoneTasks);
        };
      
        const markAllTasksDoneButton = document.querySelector(".js-allDoneTask");
      
        if (markAllTasksDoneButton) {
          markAllTasksDoneButton.addEventListener("click", markAllDone);
        };
      };



    const onFormSubmit = (event) => {
        event.preventDefault();

        const input = document.querySelector(".js-newTask");
        const newTaskContent = input.value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        input.value = "";
        input.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}