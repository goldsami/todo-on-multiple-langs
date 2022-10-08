<script lang="ts">
  import Navbar from './lib/components/Navbar.svelte';
  import {Route, Router} from 'svelte-navigator';
  import {QueryClient, QueryClientProvider} from '@sveltestack/svelte-query';
  import Users from './lib/pages/Users.svelte';
  import Tasks from './lib/pages/Tasks.svelte';

  const queryClient = new QueryClient();

  export let url = '';
</script>

<QueryClientProvider client={queryClient}>
    <Router {url}>
        <Navbar/>
        <div class="content">
            <Route component={Tasks} path="/"/>
            <Route component={Tasks} path="tasks"/>
            <Route component={Users} path="users"/>
        </div>
    </Router>
</QueryClientProvider>

<style>
</style>
