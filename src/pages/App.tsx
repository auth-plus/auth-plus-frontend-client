import React from 'react'
import { useRoutes } from 'react-router-dom'
import AuthContextCmpnt from '../contexts/Auth'
import SnackbarContextCmpnt from '../contexts/Snackbar'
import { routes } from '../helpers/routes'



export const App: React.FunctionComponent = () => {
  let elements = useRoutes(routes);
  return (
    <AuthContextCmpnt>
      <SnackbarContextCmpnt>
        {elements}
      </SnackbarContextCmpnt>
    </AuthContextCmpnt>
  )
}

export default App
