import { Redirect, Route } from "react-router"

export default function ProtectedRoute({ component: Component, path, ...props }) {
  const token = localStorage.getItem('token');

  return(
    <Route path={path}>
      {token ? <Component {...props} /> : <Redirect to='/sign-in' />}
    </Route>
  )
}