<script lang="ts">
    import { link, useLocation, useNavigate } from 'svelte-navigator';

    const location = useLocation();
    const navigate = useNavigate();

    const redirectIfNeeded = (location: string) => {
        if (location === '/') navigate('/tasks');
    };

    $: activeTab = $location.pathname.slice(1);
    $: redirectIfNeeded($location.pathname);

    let expandNavbar = false;
</script>

<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">TODO app</a>
        <button
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            class="navbar-toggler"
            data-bs-target="#navbarSupportedContent"
            data-bs-toggle="collapse"
            on:click={() => (expandNavbar = !expandNavbar)}
            type="button"
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
                    <a
                        aria-current="page"
                        class="nav-link"
                        class:active={activeTab === 'tasks'}
                        href="/tasks"
                        use:link>Tasks</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        class:active={activeTab === 'users'}
                        href="/users"
                        use:link>Users</a
                    >
                </li>
            </ul>
        </div>
    </div>
</nav>
