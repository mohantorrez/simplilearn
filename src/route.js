import App from "./components/app";
import Login from "./components/login";
const routes = [
	{
		component: App,
		routes: [
			{
				path: "/",
				exact: true,
				component: Login
			},
			{
				path: "/login",
				exact: true,
				component: Login
			}
		]
	}
];

export default routes;
