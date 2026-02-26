import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function EditPaste() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        language: 'text',
        visibility: 'public'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPaste();
    }, [id]);

    const loadPaste = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/get_paste.php?id=${id}`, { withCredentials: true  });
            if (res.data.status === 'success') {
                const paste = res.data.paste;
                
                if (!paste.can_edit) {
                    setError('You don\'t have permission to edit this paste');
                    setLoading(false);
                    return;
                }
                
                setFormData({
                    title: paste.title || '',
                    content: paste.content,
                    language: paste.language,
                    visibility: paste.visibility
                });
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load paste');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:8000/api/edit_paste.php', 
                new URLSearchParams({
                    id: id,
                    title: formData.title,
                    content: formData.content,
                    language: formData.language,
                    visibility: formData.visibility
                }), 
                {
                    withCredentials: true
                }
            );

            if (res.data.status === 'success') {
                navigate(`/paste/${id}`);
            } else {
                setError(res.data.message);
            }
            
            
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update paste');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    if (error && !formData.content) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button 
                    onClick={() => navigate(`/paste/${id}`)}
                    className="text-orange-600 hover:underline"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Paste</h2>
                    <button 
                        onClick={() => navigate(`/paste/${id}`)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
                    >
                        <X className="w-5 h-5" />
                        <span>Cancel</span>
                    </button>
                </div>
                
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="My awesome code snippet..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Language
                            </label>
                            <select
                                value={formData.language}
                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="text">Plain Text</option>
                                <option value="javascript">JavaScript</option>
                                <option value="typescript">TypeScript</option>
                                <option value="python">Python</option>
                                <option value="php">PHP</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                                <option value="sql">SQL</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Visibility
                            </label>
                            <select
                                value={formData.visibility}
                                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private (Login Required)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Code Content
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono h-96"
                            placeholder="// Paste your code here..."
                            required
                        />
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                            <Save className="w-5 h-5" />
                            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(`/paste/${id}`)}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
