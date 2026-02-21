import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, User, LogOut, Search, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import TaskModal from '../tasks/TaskModal';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleTaskCreated = () => {
        // Refresh page or trigger a refresh in children if needed
        // For now, window reload is simplest to ensure all views update
        window.location.reload();
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="flex h-screen bg-[#F7F7F5]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#EBEBE8] flex flex-col border-r border-gray-200">
                <div className="p-4 flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
                    <span className="font-semibold text-gray-800">TaskFlow</span>
                </div>

                <nav className="flex-1 px-2 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === item.path
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:bg-[#E3E3E0]'
                                }`}
                        >
                            <item.icon size={18} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-600 hover:bg-[#E3E3E0] rounded-md transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                    <div className="mt-4 flex items-center gap-3 px-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs uppercase">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-semibold text-gray-800 truncate">{user?.name}</p>
                            <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 bg-gray-100 px-3 py-1.5 rounded-md w-96">
                        <Search size={16} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="bg-transparent border-none focus:outline-none text-sm w-full"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                        <PlusCircle size={18} />
                        New Task
                    </button>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTaskCreated={handleTaskCreated}
            />
        </div>
    );
};


export default Layout;
