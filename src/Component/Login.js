import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";

import { SocketContext } from '../index'

function Login() {

    const navi = useNavigate()

    const Socket = useContext(SocketContext)

    const localInfor = localStorage.getItem('chat_bctc')
    const userNamePass = JSON.parse(localInfor)

    const [userName, setUserName] = useState(() => {
        if (userNamePass) return userNamePass[0]
        else return ''
    })
    const [pass, setPass] = useState('')
    const [isUser, setIsUser] = useState(true)
    
    const userNameRef = useRef()

    function CheckAndSaveToLocalStorage(respon) {
        if (localInfor) {
            localStorage.removeItem('chat_bctc')
            const jsonInfor = JSON.stringify([ respon[0] || respon.user, respon[1] || respon.pass ])
            localStorage.setItem('chat_bctc', jsonInfor)
        }
        else {
            const jsonInfor = JSON.stringify([ respon[0] || respon.user, respon[1] || respon.pass ])
            localStorage.setItem('chat_bctc', jsonInfor)
        }
    }

    function handleSubmitLogin() {
        console.log()
        const data = {
            user: userName,
            pass: pass
        }
        if (pass === '') {Socket.emit("client-send-user-name", data)}
        else {
            Socket.emit("client-send-pass-dang-ki", {
                user: userName ,
                pass: pass
            })
        }
    }

    const inpUser = (
        <div id="login-user">
            <input
                ref={userNameRef}
                type="text"
                id="user-name"
                placeholder="Nhập tên hiển thị..."
                value={userName}
                onChange={e => setUserName(e.target.value)}
                onKeyDown={e => {
                    if (e.keyCode === 13) handleSubmitLogin()
                }}
            />
            <br />
            <button
                onClick={handleSubmitLogin}
            >Tiếp Theo</button>
        </div>
    )

    const inpPass = (
        <div id="login-pass">
            <input
                onChange={e => setPass(e.target.value)}
                type="password"
                value={pass}
                id="user-name"
                placeholder="Nhập mật khẩu..."
                onKeyDown={e => {
                    if (e.keyCode === 13) handleSubmitLogin()
                }}
            />
            <br />
            <button
                onClick={handleSubmitLogin}
            >Đăng Nhập</button>
        </div>
    )
    
    useEffect(() => {

        if (userNamePass) {Socket.emit("login", userNamePass)}

        Socket.on("server-send-dang-ky", () => {
            const title = document.getElementById("title")
            title.innerText = "Tên hiển thị chưa được đăng ký / Nhập mật khẩu"
            setIsUser(false)
        })
        
        Socket.on("server-nhap-pass", () => {
            const title = document.getElementById("title")
            title.innerText = "Tên hiển thị đã được đăng ký / Nhập mật khẩu để đăng nhập"
            setIsUser(false)
        })
        
        Socket.on("server-send-dang-ky-thanh-cong", (data) => {
            Socket.UserName = data.user
            CheckAndSaveToLocalStorage(data)
            navi('/home')
        })

        Socket.on("server-send-dang-nhap-thanh-cong", (data) => {
            Socket.UserName = data[0] || data.user
            CheckAndSaveToLocalStorage(data)
            navi('/home')
        })

    }, [])

    return (
        <div id="content">
            <div id="form-login">
                <span id="title">Đăng nhập / Đăng ký tài khoản</span>
                {isUser ? inpUser : inpPass}
            </div>
        </div>
    )
}

export default Login
