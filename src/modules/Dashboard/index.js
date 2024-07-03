import React, { useEffect, useRef, useState } from 'react'

import { io } from "socket.io-client"
import { useSelector, useDispatch } from 'react-redux'
import Input from '../../Components/Input'
import * as UserService from '../../service/UserService'
import Loading from '../../Components/LoadingComponent/Loading'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce'
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent'
import InputComponent from '../../Components/InputComponent/InputComponent'


const Dashboard = () => {

    const user = useSelector((state) => state.user)
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const messageRef = useRef(null);
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetcConversations = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/conversations/${user?.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const resData = await res.json()
            setConversations(resData);
        };
        fetcConversations();
    }, [])

    useEffect(() => {
        setSocket(io("https://shop-gold-eight.vercel.app"));
    }, [])

    useEffect(() => {

        socket?.emit("addUser", user?.id);
        socket?.on("getUsers", users => { });

        socket?.on("getMessage", data => {
            setMessages(prev => ({
                ...prev,
                messages: [...prev?.messages, { user: data.user, message: data.message }]

            }))

        })
    }, [socket])


    useEffect(() => {
        setLoading(false)

        messageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages?.messages])



    const fetchMessages = async (conservationId, reciver) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/message/${conservationId}?senderId=${user?.id}&&reciverId=${reciver?.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const resData = await res.json();
        setMessages({ messages: resData, reciver, conservationId })
    }

    const sendMessage = async () => {
        setMessage("")
        socket?.emit("sendMessage", {
            conversationId: messages?.conservationId,
            senderId: user?.id,
            message,
            id: messages?.reciver?.id
        });

        const res = await fetch(`${process.env.REACT_APP_API_URL}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                conversationId: messages?.conservationId,
                senderId: user?.id,
                message,
                id: messages?.reciver?.id
            })
        });

    }

    const fetchUser = async (id, token) => {
        if (search) {
            const res = await UserService.getAllFollower(search, user?.access_token)
            if (res?.status === 'OK') {
                setUsers(res?.data, conversations)
            } else {
                setUsers(null)
            }
        } else {
            const res = await UserService.getFollower(id, token)
            if (res?.status === 'OK') {
                setUsers(res?.data, conversations)
            } else {
                setUsers(null)
            }
        }
    }

    useEffect(() => {
        fetchUser(user?.id, user?.access_token)
    }, [])

    const handleNavigateHome = () => {
        navigate('/')
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className='w-screen flex'>
            <div className='w-[25%] border  h-screen bg-secondary overflow-scroll '>
                <div className='flex  items-center my-8 mx-14'>
                    <div onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
                        <ArrowLeftOutlined style={{
                            fontSize: `24px`,
                            position: `fixed`,
                            top: `4%`,
                            left: `1%`,
                        }} />
                    </div>
                    <div className='border border-primary p-[2px] rounded-full ' >
                        <img src={user?.avatar} alt="avatar" style={{
                            height: '75px',
                            width: '75px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }} /> </div>

                    <div className='ml-8'>
                        <h3 className='text-2xl'>{user?.name}</h3>
                        <p className='text-lg font-light'>My Account</p>
                    </div>
                </div>

                <hr />

                <div className='mx-14 mt-10'>
                    Messages
                    <div className=' text-primary text-lg' >
                        {
                            conversations.length > 0 ?
                                conversations.map(({ conversationId, user }) => {
                                    return (
                                        <div className='flex  items-center py-8 border-b border-b-gray-300'>
                                            <div className='cursor-pointer flex items-center' onClick={() => { fetchMessages(conversationId, user) }}>
                                                <div>  <img src={user?.avatar} alt="avatar" style={{
                                                    height: '60px',
                                                    width: '60px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }} /> </div>

                                                <div className='ml-6'>
                                                    <h3 className='text-xl font-semibold'>{user?.name} </h3>
                                                    <p className='text-sm font-light text-gray-600'>{user?.email} </p>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className='text-center text-lg font-semibold mt-24' > No Conservations </div>
                        }
                    </div>
                </div>
            </div>



            <div className='w-[50%]  h-screen bg-white flex flex-col items-center'>
                {
                    messages?.reciver?.name &&
                    <div className=' w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 ' >

                        <div className='cursor-pointer' >
                            <img src={messages?.reciver?.avatar} alt="avatar" style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} /> </div>

                        <div className=' ml-6 mr-auto'>
                            <h3 className=' texxt-lg'>{messages?.reciver?.name} </h3>
                            <p className='text-sm font-light text-gray-600'>{messages?.reciver?.email}</p>
                        </div>

                        <div className='cursor-pointer'>

                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 9l5 -5" /><path d="M16 4l4 0l0 4" /></svg>

                        </div>

                    </div>

                }

                <div className='h-[75%]  w-full overflow-scroll border-b shadow-sm'>
                    <div className='p-14'>
                        <Loading isLoading={isLoading}>

                            {
                                messages?.messages?.length > 0 ?
                                    messages?.messages?.map(({ message, user: { id } = {} }) => {
                                        return (
                                            <>
                                                <div className={`max-w-[40%] bg-primary rounded-b-xl p-4 mb-6 ${id === user?.id ? 'bg-rimary text-white rounded-tl-xl ml-auto' : 'bg-secondary rounded-tr-xl'}`}>
                                                    {message}
                                                </div>

                                                <div ref={messageRef} > </div>
                                            </>
                                        )

                                    }) :
                                    <p>There is no message </p>
                            }
                        </Loading>
                    </div>
                </div>

                {
                    messages?.reciver?.name &&
                    <div className='p-14 w-full flex items-center'>
                        <Input placeHolder='Type a message...' value={message} onChange={(e) => { setMessage(e.target.value) }} className='w-[75%]' InputclassName='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />

                        <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={() => { sendMessage() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                        </div>

                        <div className='ml-4 p-2 cursor-pointer bg-light rounded-full' >
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                        </div>
                    </div>
                }

            </div>

            <div className='w-[25%] border  h-screen bg-light px-8 py-16 overflow-scroll '>
                <InputComponent
                    onChange={onSearch}
                />
                <ButtonComponent
                    onClick={() => fetchUser(search)}
                    size={40}
                    styleButton={{
                        height: '36px',
                        border: '1px solid #9255FD',
                        borderRadius: '4px'
                    }}
                    textButton={'Tìm kiếm'}
                    styleTextButton={{ color: '#9255FD', fontSize: '14px' }} />
                <div className='flex items-center py-8 border-b border-b-gray-300'  > People</div>

                <div className=' text-primary text-lg' >
                    {
                        users.length > 0 ?
                            users.map((user) => {
                                return (
                                    <div className='flex  items-center py-8 border-b border-b-gray-300'>
                                        <div className='cursor-pointer flex items-center' onClick={() => { fetchMessages("new", user) }}>
                                            <div>  <img src={user?.avatar} alt="avatar" style={{
                                                height: '60px',
                                                width: '60px',
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }} /> </div>

                                            <div className='ml-6'>
                                                <h3 className='text-xl font-semibold'>{user?.name} </h3>
                                                <p className='text-sm font-light text-gray-600'>{user?.email} </p>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className='text-center text-lg font-semibold mt-24' > No Users </div>
                    }
                </div>

            </div>

        </div>
    )
}

export default Dashboard
