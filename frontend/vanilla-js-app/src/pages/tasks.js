import { tasksService } from "../services";

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
    document.querySelector('.create-task-button')?.addEventListener('click', () => console.log('create task'))
  }

  async deleteTaskEventHandler({ detail }) {
    await tasksService.deleteTask(detail.id)
    this.render()
  }

  async taskClickEventHandler(id) {
    // this.mutatedTask = this.#tasks.find(x => x.id == id)
    console.log('mutate');
    // setTimeout(() => document.querySelector('#updateTask')?.setAttribute('test', 'nice'), 5000)
  }

  getTemplate(isLoading, tasks = []) {
    return isLoading
      ? 'Loading...'
      : `
        <div id="tasksPage" class="row">        
          <a class="waves-effect waves-light btn modal-trigger create-task-button" href="#createTaskModal">Create Task</a>
          ${tasks.map(x => (`
            <div id="${x.id}" class="modal-trigger task-wrapper" href="#updateTaskModal">
                <cc-task-card task='${JSON.stringify(x)}'></cc-task-card>
            </div>
          `)).join('')}
        </div>
      
        <cc-create-task-modal id="createTask"></cc-create-task-modal>
        <cc-update-task-modal id="updateTask" test="test1"></cc-update-task-modal>
      `
  }
}

customElements.define('cc-tasks-page', TasksPage)
