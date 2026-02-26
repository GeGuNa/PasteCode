import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code, User, LogOut, Plus, History, Settings as SettingsIcon } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                        <Code className="w-6 h-6" />
                        <span>DevPaste</span>
                    </Link>
                    
                    <div className="flex items-center space-x-4">
                        <Link to="/create" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">New Paste</span>
                        </Link>
                        
                        {user ? (
                            <>
                                <Link to="/dashboard" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                                    <History className="w-5 h-5" />
                                    <span className="hidden sm:inline">History</span>
                                </Link>
                                <Link to="/settings" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                                    <SettingsIcon className="w-5 h-5" />
                                    <span className="hidden sm:inline">Settings</span>
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">{user.username}</span>
                                </div>
                                <button 
                                    onClick={logout}
                                    className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-indigo-200 transition">
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
