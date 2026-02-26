import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Copy, Clock, User, Code, Edit, Trash2 } from 'lucide-react';

export default function ViewPaste() {
    const { id } = useParams();
    const [paste, setPaste] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        loadPaste();
    }, [id]);

    const loadPaste = async () => {
        try {
       	const res = await axios.get(`http://localhost:8000/api/get_paste.php?id=${id}`, {
            	withCredentials: true 
        	});
            if (res.data.status === 'success') {
                setPaste(res.data.paste);
            } else {
                setError(res.data.message);
            }
           
        } catch (err) {
         console.log(err.response.data)
            setError(err.response?.data?.message || 'Failed to load paste');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(paste.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const deletePaste = async () => {
        if (!window.confirm('Are you sure you want to delete this paste?')) return;

        try {
            const res = await axios.post('http://localhost:8000/api/delete_paste.php', 
                new URLSearchParams({ id: id }), 
                {
                    withCredentials: true
                }
            );
            if (res.data.status === 'success') {
                window.location.href = '/dashboard';
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            alert('Failed to delete paste');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !paste) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Paste Not Found</h2>
                <p className="text-gray-600 mb-6">{error || 'The paste you\'re looking for doesn\'t exist.'}</p>
                <Link to="/create" className="text-indigo-600 hover:underline">Create a new paste</Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{paste.title || 'Untitled'}</h1>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                                <Code className="w-4 h-4" />
                                <span className="uppercase">{paste.language}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(paste.created_at).toLocaleString()}</span>
                            </span>
                            {paste.author && (
                                <span className="flex items-center space-x-1">
                                    <User className="w-4 h-4" />
                                    <span>{paste.author}</span>
                                </span>
                            )}
                            <span className={`px-2 py-0.5 rounded text-xs ${paste.visibility === 'private' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                {paste.visibility}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {paste.can_edit && (
                            <>
                                <Link 
                                    to={`/paste/${id}/edit`}
                                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Edit</span>
                                </Link>
                                <button
                                    onClick={deletePaste}
                                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                </button>
                            </>
                        )}
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            <Copy className="w-4 h-4" />
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-6 overflow-x-auto">
                    <code className="font-mono text-sm">{paste.content}</code>
                </pre>
            </div>
        </div>
    );
}
