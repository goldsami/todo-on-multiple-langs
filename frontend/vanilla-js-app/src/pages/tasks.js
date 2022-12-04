import {tasksService} from "../services";

class TasksPage extends HTMLElement {
  rendered = false
  currentTab = 'all'

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  disconnectedCallback() {
    document.removeEventListener('delete-task', this.deleteTaskEventHandler)
  }

  async loadTasks() {
    const {data} = await tasksService.getTasks()
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
    const tasks = await this.loadTasks()
    const filteredTasks = this.filterTasks(tasks, this.currentTab)
    this.renderTasks(tasks)
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
  }

  async deleteTaskEventHandler({detail}) {
    await tasksService.deleteTask(detail.id)
    this.render()
  }

  getTemplate(isLoading, tasks = []) {
    return isLoading
      ? 'Loading...'
      : `
        <div id="tasksPage" class="row">        
          <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Create Task</a>
          ${tasks.map(x => (`
            <cc-task-card task='${JSON.stringify(x)}'></cc-task-card>
          `)).join('')}
        </div>
      
        <cc-mutate-task-modal isCreateModal="true"></cc-mutate-task-modal>
      `
  }
}

customElements.define('cc-tasks-page', TasksPage)