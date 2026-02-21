import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { CheckCircle2, Clock, ListChecks, Trash2, CheckCircle } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/api/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/api/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (error) {
            alert('Failed to delete task');
        }
    };

    const handleToggleStatus = async (task) => {
        try {
            const newStatus = task.status === 'completed' ? 'pending' : 'completed';
            const { data } = await api.put(`/api/tasks/${task._id}`, { status: newStatus });
            setTasks(tasks.map(t => t._id === task._id ? data : t));
        } catch (error) {
            alert('Failed to update task');
        }
    };

    const stats = [
        { label: 'Total Tasks', value: tasks.length, icon: ListChecks, color: 'bg-indigo-50 text-indigo-600' },
        { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
        { label: 'Pending', value: tasks.filter(t => t.status === 'pending').length, icon: Clock, color: 'bg-orange-50 text-orange-600' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name} 👋</h1>
                <p className="text-gray-500 mt-1">Here's what's happening with your projects today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-50 rounded-lg"></div>)}
                        </div>
                    ) : tasks.length > 0 ? (
                        tasks.slice(0, 5).map((task) => (
                            <div key={task._id} className="group flex items-center justify-between p-3 bg-gray-50 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 rounded-lg transition-all">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleToggleStatus(task)}
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.status === 'completed'
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'border-gray-300 hover:border-indigo-500'
                                            }`}
                                    >
                                        {task.status === 'completed' && <CheckCircle size={12} />}
                                    </button>
                                    <span className={`text-sm font-medium transition-all ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-700'
                                        }`}>
                                        {task.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-gray-400 opacity-100 group-hover:opacity-0 transition-opacity">
                                        {new Date(task.createdAt).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400 text-sm">No recent tasks. Start by creating one!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
