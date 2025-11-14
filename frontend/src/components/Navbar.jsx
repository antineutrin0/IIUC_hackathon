import {
    BookA, Target, LogOut, User, Home, Briefcase,
    FolderOpen, Menu, X
} from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getData } from '@/context/userContext'
import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {
    const { user, setUser } = getData()
    const accessToken = localStorage.getItem("accessToken")
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/user/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                setUser(null)
                toast.success(res.data.message)
                localStorage.clear()
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const profilehandler = () => {
        navigate('/user/profile')
    }   

    return (
        <nav className='p-3 border-b border-gray-200 bg-transparent relative z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>

                {/* Logo */}
                <Link to='/' className='flex gap-2 items-center'>
                    <Target className='h-6 w-6 text-green-800' />
                    <h1 className='font-bold text-xl'>
                        <span className='text-green-600'>Next</span>Step
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <ul className='hidden md:flex gap-7 items-center text-lg font-semibold text-green-800'>
                    <li><Link to='/home' className='hover:text-green-600 flex items-center gap-1'><Home className='w-4 h-4' /> Home</Link></li>
                    <li><Link to='/find-jobs' className='hover:text-green-600 flex items-center gap-1'><Briefcase className='w-4 h-4' /> Find Jobs</Link></li>
                    <li><Link to='/resources' className='hover:text-green-600 flex items-center gap-1'><FolderOpen className='w-4 h-4' /> Resources</Link></li>
                    <li><Link to='/about' className='hover:text-green-600'>About</Link></li>

                    {/* User Dropdown */}
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem  onClick={profilehandler} className="flex items-center gap-2"><User className='w-4 h-4 text-green-600' /> Profile</DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2"><BookA className='w-4 h-4 text-green-600' /> Notes</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logoutHandler} className="flex items-center gap-2 text-red-600">
                                    <LogOut className='w-4 h-4' /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <li><Link to='/login' className='hover:text-green-600'>Login</Link></li>
                    )}
                </ul>

                {/* Mobile Hamburger */}
                <button className='md:hidden text-green-800' onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                </button>
            </div>

            {/* Overlapping Mobile Menu */}
            <div
                className={`fixed top-[60px] left-0 w-full bg-green-50/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out md:hidden ${menuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-5 invisible'
                    }`}
            >
                <ul className='flex flex-col gap-4 p-5 text-green-800 font-medium'>
                    <li><Link to='/' onClick={() => setMenuOpen(false)} className='flex items-center gap-2'><Home className='w-4 h-4' /> Home</Link></li>
                    <li><Link to='/find-jobs' onClick={() => setMenuOpen(false)} className='flex items-center gap-2'><Briefcase className='w-4 h-4' /> Find Jobs</Link></li>
                    <li><Link to='/resources' onClick={() => setMenuOpen(false)} className='flex items-center gap-2'><FolderOpen className='w-4 h-4' /> Resources</Link></li>
                    <li><Link to='/about' onClick={() => setMenuOpen(false)}>About</Link></li>

                    {user ? (
                        <>
                            <hr className='border-gray-300' />
                            <li className='flex items-center gap-2'><User className='w-4 h-4 text-green-600' /> Profile</li>
                            <li className='flex items-center gap-2'><BookA className='w-4 h-4 text-green-600' /> Notes</li>
                            <li onClick={logoutHandler} className='flex items-center gap-2 text-red-600 cursor-pointer'>
                                <LogOut className='w-4 h-4' /> Logout
                            </li>
                        </>
                    ) : (
                        <li><Link to='/login' onClick={() => setMenuOpen(false)}>Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
