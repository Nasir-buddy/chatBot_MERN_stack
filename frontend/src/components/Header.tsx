
import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import { NavigLInk } from './shared/NavigLInk'
const Header = () => {
  const auth = useAuth();

  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigLInk bg='#00fffc' to='/chat' text='Go To Chat' textColor='black' />
              <NavigLInk bg='#51538f' textColor='white' to='/' text='logout' onClick={auth.logout} />
            </>) :
            (<>
              <NavigLInk bg='#00fffc' to='/login' text='LogIn' textColor='black' />
              <NavigLInk bg='#51538f' textColor='white' to='/signup' text='signup' />
            </>)}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header