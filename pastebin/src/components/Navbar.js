import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code, User, LogOut, Plus, History, Settings as SettingsIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-orange-600 to-red-800 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                        <Code className="w-6 h-6" />
                        <span>DevPaste</span>
                    </Link>
                    
             
                    <div className="hidden md:flex items-center space-x-4">
                        {user && (
                            <>
                                <Link to="/create" className="flex items-center space-x-1 hover:text-orange-200 transition">
                                    <Plus className="w-5 h-5" />
                                    <span>New Paste</span>
                                </Link>
                                <Link to="/dashboard" className="flex items-center space-x-1 hover:text-orange-200 transition">
                                    <History className="w-5 h-5" />
                                    <span>History</span>
                                </Link>
                            </>
                        )}
                        
                        <Link to="/about" className="hover:text-orange-200 transition">About</Link>
                        <Link to="/contact" className="hover:text-orange-200 transition">Contact</Link>
                        <Link to="/terms" className="hover:text-orange-200 transition">Terms</Link>
                        
                        {user ? (
                            <>
                                <Link to="/settings" className="flex items-center space-x-1 hover:text-orange-200 transition">
                                    <SettingsIcon className="w-5 h-5" />
                                    <span>Settings</span>
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">{user.username}</span>
                                </div>
                                <button 
                                    onClick={logout}
                                    className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition">
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-orange-200 transition">
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                   
                    <button 
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

    
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/20">
                        {user && (
                            <>
                                <Link to="/create" className="block py-2 hover:text-orange-200">New Paste</Link>
                                <Link to="/dashboard" className="block py-2 hover:text-orange-200">History</Link>
                            </>
                        )}
                        <Link to="/about" className="block py-2 hover:text-orange-200">About</Link>
                        <Link to="/contact" className="block py-2 hover:text-orange-200">Contact</Link>
                        <Link to="/terms" className="block py-2 hover:text-orange-200">Terms</Link>
                        
                        {user ? (
                            <>
                                <Link to="/settings" className="block py-2 hover:text-orange-200">Settings</Link>
                                <button onClick={logout} className="block py-2 text-left hover:text-orange-200">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block py-2 hover:text-orange-200">Login</Link>
                                <Link to="/register" className="block py-2 hover:text-orange-200">Sign Up</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
