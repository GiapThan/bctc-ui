
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../../index'

const Row = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19']
const Col = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19']
const idhasClick = []
export default function Caro({Room}) {

    const xElement = "<img src='/xox.png' class='img-ox'></img>"
    const oElement = "<img src='/oxo.png' class='img-ox'></img>"

    const Socket = useContext(SocketContext)

    const navigator = useNavigate()

    const [isClick, setIsClick] = useState(true)

    useEffect(() => {

        Socket.on('server-send-co-nguoi-tick', ({idAddress, name}) => {
            idhasClick.push(idAddress)
            const a= document.getElementById(idAddress)
            if (Socket.UserName != name) {
                a.innerHTML = oElement
                setIsClick(true)
            }
        })

        Socket.on("server-co-nguoi-thang", name => {
            if (name == Socket.UserName) {
                alert("Bạn đã thắng")
                navigator('/home')
            }
            else {
                alert("Bạn đã thua")
                navigator('/home')
            }
        })

    }, [])

    function handleClick(e) {
        if (idhasClick.includes(e.target.id)) {}
        else {
            e.target.innerHTML = xElement
            Socket.emit("client-send-tick-caro", {
                idAddress: e.target.id,
                room: Socket.room,
                name: Socket.UserName
            })
            setIsClick(false)
        }
        idhasClick.push(e.target.id)
    }

    function handleHover(e) {
        e.target.style.backgroundColor = "#a6bbe0"
    }

    function handleUnHover(e) {
        e.target.style.backgroundColor = "white"
    }


    return(
        <div className="wrapper-net">
            {Row.map((er) => (
                Col.map((ec) => (
                    <div
                        onClick={e=>{if (isClick) handleClick(e)}}
                        style={{'backgroundColor':'none'}}
                        onMouseEnter={e=>{if (!e.target.hasChildNodes()) handleHover(e)}}
                        onMouseLeave={e=>handleUnHover(e)}
                        id={er+ec}
                        key={er+ec}
                        className="adress"
                    ></div>
                ))
            ))}
        </div>
        
    )
    
}
