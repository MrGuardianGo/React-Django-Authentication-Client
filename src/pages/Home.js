import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
    const user = useSelector((state) => state.user)

    return (
    <div className='home'>
        <div className="side-container">
        <div className="user-profile">
            <h3>{user.data.name}</h3>
        </div>
            <div className="friends-list"></div>
            <div className="user-btns">
                <button>Add Friends</button>
                <button>Logout</button>
            </div>
        </div>
    </div>
  )
}
