import { tasksService, usersService } from "../services";

class TasksPage extends HTMLElement {
  #rendered = false
  #currentTab = 'all'
  #tasks = []
  // #mutatedTask = null

  // set mutatedTask(val) {
  //   this.#mutatedTask = val
  //   document.querySelector('#mutateTask').setAttribute('isCreateModal', 'false')
  //   console.log({ el: document.querySelector('#mutateTask') })
  // }

  connectedCallback() {
    if (!this.#rendered) {
      this.render()
      this.#rendered = true
    }
  }

  disconnectedCallback() {
    document.removeEventListener('delete-task', this.deleteTaskEventHandler)
  }

  async loadTasks() {
    const { data } = await tasksService.getTasks()
    return data
  }

  filterTasks = (tasks, currentTab) => {
    switch (currentTab) {
      case 'all':
        return tasks;
      case 'upcoming':
        return tasks.filter((x) => x.time && new Date() < new Date(x.time));
      case 'done':
        return tasks.filter((x) => x.status === 'done');
    }
  };

  async render() {
    this.disconnectedCallback()
    this.innerHTML = this.getTemplate(true)
    this.initModal()
    this.#tasks = await this.loadTasks()
    const filteredTasks = this.filterTasks(this.#tasks, this.#currentTab)
    this.renderTasks(this.#tasks)
    this.addEventListeners()
  }

  async renderTasks(tasks) {
    this.innerHTML = this.getTemplate(false, tasks)
    this.initModal()
  }

  initModal() {
    const modals = document.querySelectorAll('.modal');
    if (!modals.length) return
    const instances = M.Modal.init(modals);
  }

  addEventListeners() {
    document.addEventListener('delete-task', this.deleteTaskEventHandler.bind(this))
    document.querySelectorAll('.task-wrapper')
      .forEach(el => el.addEventListener('click', () => this.taskClickEventHandler(el.id)))
    document.querySelector('.create-task-button')?.addEventListener('click', () => this.openMutateTaskModal())
  }

  async deleteTaskEventHandler({ detail }) {
    await tasksService.deleteTask(detail.id)
    this.render()
  }

  taskClickEventHandler(id) {
    const task = this.#tasks.find(x => x.id == id)
    this.openMutateTaskModal(task)
  }

  openMutateTaskModal(task) {
    const modal = document.getElementById("task-modal");
    const modalName = document.getElementById("modal-name");
    const overlay = document.querySelector(".overlay");
    const form = document.getElementById("task-form");
    const nameInput = document.getElementById("task-name");
    const descriptionInput = document.getElementById("task-description");
    const timeInput = document.getElementById("task-time");
    const userSelect = document.getElementById("task-user");

    modalName.innerText = `${task ? 'Update' : 'Create'} Task`
    nameInput.value = task?.name || '';
    descriptionInput.value = task?.description || '';
    timeInput.value = task?.time.split('.')[0] || null;

    usersService.getUsers().then(({data: users}) => {
      userSelect.innerHTML = users.map(user => `<option value="${user.id}">${user.name}</option>`).join("");
      userSelect.value = task?.user_id;
    })

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const taskToSave = {
        id: task?.id,
        name: nameInput.value,
        description: descriptionInput.value,
        status: task?.status || 'open',
        time: timeInput.value,
        user_id: +userSelect.value
      };

      
      task 
        ? console.log({updatedTask: taskToSave})
        : tasksService.createTask(taskToSave).then(() => this.render())
      // updateTask(updatedTask).then(() => {
      //   this.render();
      //   modal.style.display = "none";
      //   overlay.style.display = "none";
      // });
    });

    const cancelButton = document.getElementById("cancel-button");
    cancelButton.addEventListener("click", () => {
      modal.style.display = "none";
      overlay.style.display = "none";
    });

    modal.style.display = "block";
    overlay.style.display = "block";
  }

  getTemplate(isLoading, tasks = []) {
    return isLoading
      ? 'Loading...'
      : `
        <div id="tasksPage" class="row">        
          <a class="waves-effect waves-light btn modal-trigger create-task-button">Create Task</a>
          ${tasks.map(x => (`
            <div id="${x.id}" class="modal-trigger task-wrapper" href="#updateTaskModal">
                <cc-task-card task='${JSON.stringify(x)}'></cc-task-card>
            </div>
          `)).join('')}
        </div>
      
        <cc-mutate-task-modal id="mutate"></cc-mutate-task-modal>
      `
  }
}

customElements.define('cc-tasks-page', TasksPage)
