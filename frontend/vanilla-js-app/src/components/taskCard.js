/*
  Props:
    task: {
      name: string
      description: string
    }
 */
class TaskCard extends HTMLElement {
  rendered = false

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  disconnectedCallback() {
  }

  static get observedAttributes() {
    return ['task'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.getTemplate(this.task)
    this.addEventListeners()
  }

  getTemplate({id, name, description, time, user, status}) {
    return `
      <div id="task-${id}" class="task-card">
        <div class="card" style="width: 20rem;">           
          <div class="card-body">
            <h5 class="card-title">
              <input class="status-checkbox form-check-input" type="checkbox" ${status === 'done' ? 'checked' : ''} style="margin-right: 0.5rem;" />
              ${user.image_url 
                ? `<img
                  class="task-owner-image" style="margin-right: 0.5rem;"
                  src="${user.image_url}" />`
                : ''
              }
              <span class="task-name">${name}</span>               
              <i class="material-icons right delete-button">close</i>
            </h5>
            <h6 class="card-subtitle text-body-secondary">${new Date(time).toLocaleDateString()}</h6>
            <p class="card-text">${description}</p>
          </div>
        </div>
      </div>
    `
  }

  addEventListeners() {
    this.selfElement
      ?.querySelector('.delete-button')
      ?.addEventListener('click', () => this.deleteTask(this.task?.id))
  }

  get selfElement() {
    return document.getElementById('task-' + this.task?.id)
  }

  get task() {
    return this.getAttribute('task')
      ? JSON.parse(this.getAttribute('task'))
      : null
  }

  deleteTask(id) {
    document.dispatchEvent(new CustomEvent('delete-task', {
      detail: {id}
    }))
  }
}

customElements.define('cc-task-card', TaskCard)
