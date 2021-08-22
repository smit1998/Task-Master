import DashboardPage from './pages/Dashboard/DashboardPage';
import Connections from './pages/Connections';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Search from './pages/Search';
import TaskSearch from './pages/TaskSearch';

const routes = [
  {
    path: "/dashboard/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-teal",
    component: DashboardPage
  },
  {
    path: "/dashboard/projects",
    name: "Projects",
    icon: "ni ni-bullet-list-67 text-red",
    component: Projects
  },
  {
    path: "/dashboard/profile",
    name: "My Profile",
    icon: "ni ni-badge text-yellow",
    component: Profile
  },
  {
    path: "/dashboard/connections",
    name: "Connections",
    icon: "ni ni-single-02 text-green",
    component: Connections
  },
  {
    path: "/dashboard/taskSearch",
    name: "Task Search",
    icon: "ni ni-single-copy-04 text-blue",
    component: TaskSearch
  },
  {
    path: "/dashboard/search",
    name: "User Search",
    icon: "ni ni-world-2 text-purple",
    component: Search
  }
];

export default routes;
