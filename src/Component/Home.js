import { useState, useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { SocketContext } from '../index'
import Caro from './UIGames/Caro'
import BCTC from './UIGames/BCTC'


export default function Home() {

    const Socket = useContext(SocketContext)

    const idRoomRef = useRef()

    const navigator = useNavigate()

    const [room, setRoom] = useState('')
    const [isroom, setIsRoom] = useState()
    const [viewCaro, setViewCaro] = useState(false)
    const [viewBCTC, setViewBCTC] = useState(false)
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        
        if (Socket.UserName) {
            alert(`Bạn đã đăng nhập thành công với tên ${Socket.UserName}`)            
        }
        else navigator('/')

        Socket.on("server-send-co-nguoi-join-rom", part => {
            //setListUser([...part])
        })

        Socket.on("server-send-logout-thanh-cong", () => {
            Socket.UserName = undefined
            localStorage.removeItem('chat_bctc')
            navigator('/')
        })

        Socket.on("server-send-join-room-thanh-cong", (room) => {
            Socket.room = room
            setIsRoom(true)
        })

        Socket.on("server-send-roon-da-du-nguoi", (room) => {
            alert(`Phòng ${room} đã đủ người. Chọn phòng khác`)
        })

    }, [])

    function handleLogOut() {
        Socket.emit("log-out", room)
    }

    function handleCreatRoom() {
        if (idRoomRef.current.getAttribute("disabledv1")) {
            return
        }
        const idRoom = String(Math.round(Math.random() *1000))
        setRoom(idRoom)
        idRoomRef.current.setAttribute("disabledv1", true)
    }

    function handleJoinRoom() {
        if (room != '')
            {Socket.emit("client-send-join-room", room)}
        
    }

    function handleViewCaro() {
        if(isroom && !viewCaro) setViewCaro(true)
    }

    function handleViewBCTC() {
        setViewCaro(false)
        if(isroom) setViewBCTC(true)
    }

    return (
        <div>

            <nav id="navbar">

                <div id="infor">
                    <span id="tai-khoan">Tài Khoản : </span>
                    <span id="view-user-name">{Socket.UserName}</span>
                </div>
                
                <div id="btn-login">
                    <button
                        onClick={handleLogOut}
                    >Đăng Suất</button>
                </div>
                
            </nav>
            <div id="view-id-room">
                <span>Phòng : </span>
                {isroom && <span>  {room}</span>}
                    
            </div>
            
            {!isroom && <div id="create-room">
                <input
                    placeholder="ID phòng..."
                    ref={idRoomRef}
                    onChange={e => setRoom(e.target.value)}
                    onKeyDown={e => {
                        if (e.keyCode === 13) handleJoinRoom()
                    }}
                    value={room}
                />
                <button onClick={handleCreatRoom}>Tạo Phòng</button>
                <button onClick={handleJoinRoom}>Vào Phòng</button>
            </div>}

            <div id="games">
                <div onClick={handleViewCaro} className="btn-game btn-game-caro">Cờ CaRo</div>
                <div className="btn-game btn-game-bctc">Bầu cua tôm cá</div>
            </div>

            {viewCaro? <Caro room={room}/>: <div></div>}
            {/* {viewBCTC? <BCTC />: <div></div>} */}

        </div>
    )
}
