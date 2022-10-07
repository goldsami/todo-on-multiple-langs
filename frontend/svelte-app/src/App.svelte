<script lang="ts">
  import Navbar from './lib/Navbar.svelte';
  import {Router, Route} from 'svelte-navigator';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import Users from './lib/pages/Users.svelte';
  import Tasks from './lib/pages/Tasks.svelte';

  const queryClient = new QueryClient();

  export let url = '';
</script>

<QueryClientProvider client={queryClient}>
  <Router {url}>
    <Navbar />
    <div class="content">
      <Route path="/" component={Tasks} />
      <Route path="tasks" component={Tasks} />
      <Route path="users" component={Users} />
    </div>
  </Router>
</QueryClientProvider>

<style>
</style>
