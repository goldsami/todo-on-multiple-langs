<script lang="ts">
  import {link, useLocation, useNavigate} from 'svelte-navigator';

  const location = useLocation();
  const navigate = useNavigate();

  const redirectIfNeeded = (location: string) => {
    if (location === '/') navigate('/tasks')
  }

  $: activeTab = $location.pathname.slice(1)
  $: redirectIfNeeded($location.pathname)

  let expandNavbar = false;
</script>

<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">TODO app</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      on:click={() => (expandNavbar = !expandNavbar)}
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div
      class="collapse navbar-collapse"
      class:show={expandNavbar}
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" class:active={activeTab === 'tasks'} use:link aria-current="page" href="/tasks"
            >Tasks</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" class:active={activeTab === 'users'} use:link href="/users">Users</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
