import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { CheckCircle2, Clock, ListChecks } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        fetchTasks();
    }, []);

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
                            <div key={task._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">{task.title}</span>
                                </div>
                                <span className="text-xs text-gray-400">{new Date(task.createdAt).toLocaleDateString()}</span>
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
