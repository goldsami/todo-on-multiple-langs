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

  getTemplate({id, name, description, time, user}) {
    return `
      <div id="task-${id}" class="col s12 m7 task-card">
        <div class="card">           
          <div class="card-content">
            <span class="card-title">
                ${user.image_url && `<img
                    class="task-owner-image"
                    src="${user.image_url}" />
                `}
                <span class="task-name">${name}</span>               
                <i class="material-icons right delete-button">close</i>
            </span>
            <p>${description}</p>
            <span>${new Date(time).toLocaleDateString()}</span>
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
