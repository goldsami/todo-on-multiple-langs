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
    this.innerHTML = this.getTemplate(true)
    const tasks = await this.loadTasks()
    const filteredTasks = this.filterTasks(tasks, this.currentTab)
    this.renderTasks(tasks)
  }

  async renderTasks(tasks) {
    this.innerHTML = this.getTemplate(false, tasks)
  }

  getTemplate(isLoading, tasks = []) {
    console.log({tasks})
    return isLoading
      ? 'Loading...'
      : `
        <div class="row">
          ${tasks.map(x => (`
            <cc-task-card task='${JSON.stringify(x)}'></cc-task-card>
          `)).join('')}
        </div>
      `
  }
}

customElements.define('cc-tasks-page', TasksPage)
