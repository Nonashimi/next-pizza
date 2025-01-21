import { signIn, useSession } from 'next-auth/react';
import React from 'react'
import { Button } from '../ui';
import {  CircleUserIcon, User } from 'lucide-react';
import Link from 'next/link';

type Props = {
    onClickSignIn?: () => void,
}

function ProfileButton({onClickSignIn}: Props) {
    const {data: session} = useSession();
  return (
    <div className="">
        {
            !session? 
            <Button
                onClick={onClickSignIn}
                variant={"outline"} 
                className='flex items-center gap-1'>
                <User size={16}/>
                Войти
            </Button>
            :
            <Link href="/profile">
            <Button variant="secondary" className="flex items-center gap-2">
              <CircleUserIcon size={18}/>
              Профиль
            </Button>
          </Link>
        }
    </div>
  )
}

export default ProfileButton