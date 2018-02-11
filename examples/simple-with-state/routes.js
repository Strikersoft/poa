// pages
import RootPage from './pages/root.page';
import DummyPage from './pages/dummy.page';

export const routes = [
  { path: '', redirectTo: '/home' },
  { path: '/home', component: RootPage },
  { path: '/new-route', component: DummyPage }
];
