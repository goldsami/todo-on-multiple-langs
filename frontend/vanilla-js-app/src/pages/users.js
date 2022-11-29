import {usersService} from "../services/index.js";

class UsersPage extends HTMLElement {
  rendered = false

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  async loadUsers() {
    const {data} = await usersService.getUsers()
    return data
  }

  async render() {
    this.innerHTML = this.getTemplate(true)
    const users = await this.loadUsers()
    this.innerHTML = this.getTemplate(false, users)
  }

  getTemplate(isLoading, users = []) {
    return isLoading
      ? 'Loading...'
      : `
        <div class="row">
            ${users.map(x => (`
                <cc-user-card 
                    name="${x.name}" 
                    imageUrl="${x.image_url}" 
                    description="${x.description}"
                ></cc-user-card>
            `)).join('')}
        </div>
      `
  }
}

customElements.define('cc-users-page', UsersPage)
