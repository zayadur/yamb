import { signIn, signOut, useSession } from 'next-auth/react'
import {
  LoginIcon,
  LogoutIcon,
  NewspaperIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'

function Sidebar() {

  const { data: session } = useSession()

  return (
    <div className='flex flex-col items-center col-span-2 px-4 md:items-start'>
      <SidebarRow Icon={NewspaperIcon} title='Your Feed' />
      <SidebarRow Icon={session ? LogoutIcon : LoginIcon} onClick={ session ? signOut : signIn } title={ session ? 'Sign Out' : 'Sign In' } />
    </div>
  )
}

export default Sidebar