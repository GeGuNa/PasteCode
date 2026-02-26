import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FileText, Trash2, Clock, Eye, Edit } from 'lucide-react';

export default function Dashboard() {
    const [pastes, setPastes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/history.php', {
                withCredentials: true
            });
            if (res.data.status === 'success') {
                setPastes(res.data.pastes);
            }
        } catch (error) {
            console.error('Failed to load history:', error);
        } finally {
            setLoading(false);
        }
    };

    const deletePaste = async (id) => {
        if (!window.confirm('Are you sure you want to delete this paste?')) return;

        try {
            const res = await axios.post('http://localhost:8000/api/delete_paste.php', 
                new URLSearchParams({ id: id }), 
                {
                    withCredentials: true
                }
            );
            if (res.data.status === 'success') {
                setPastes(pastes.filter(p => p.id !== id));
            }
        } catch (error) {
            alert('Failed to delete paste');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">My Pastes</h2>
                <Link 
                    to="/create" 
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center space-x-2"
                >
                    <FileText className="w-5 h-5" />
                    <span>New Paste</span>
                </Link>
            </div>

            {pastes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No pastes yet</h3>
                    <p className="text-gray-500 mb-6">Create your first code snippet</p>
                    <Link to="/create" className="text-orange-600 hover:underline">Create Paste</Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {pastes.map(paste => (
                        <div key={paste.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <Link to={`/paste/${paste.id}`} className="block">
                                        <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-600">
                                            {paste.title || 'Untitled'}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{new Date(paste.created_at).toLocaleDateString()}</span>
                                        </span>
                                        <span className="uppercase bg-gray-100 px-2 py-0.5 rounded">{paste.language}</span>
                                        <span className={`flex items-center space-x-1 ${paste.visibility === 'private' ? 'text-red-600' : 'text-green-600'}`}>
                                            <Eye className="w-4 h-4" />
                                            <span className="capitalize">{paste.visibility}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Link 
                                        to={`/paste/${paste.id}`}
                                        className="text-orange-600 hover:text-orange-800 p-2"
                                        title="View"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </Link>
                                    <Link 
                                        to={`/paste/${paste.id}/edit`}
                                        className="text-blue-600 hover:text-blue-800 p-2"
                                        title="Edit"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </Link>
                                    <button 
                                        onClick={() => deletePaste(paste.id)}
                                        className="text-red-600 hover:text-red-800 p-2"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
