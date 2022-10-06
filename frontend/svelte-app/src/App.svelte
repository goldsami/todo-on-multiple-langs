<script lang="ts">
  import Navbar from './lib/Navbar.svelte';
  import { Router, Route } from 'svelte-routing';
  import Users from './lib/pages/Users.svelte';
  import Tasks from './lib/pages/Tasks.svelte';

  export let url = '';
</script>

<Router {url}>
  <Navbar />
  <div class="content">
    <Route path="/" component={Tasks} />
    <Route path="tasks" component={Tasks} />
    <Route path="users" component={Users} />
  </div>
</Router>

<style>
</style>
