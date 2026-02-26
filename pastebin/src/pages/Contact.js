import { useState } from 'react';
import axios from 'axios';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('email', formData.email);
        submitData.append('subject', formData.subject);
        submitData.append('message', formData.message);

        try {
            const res = await axios.post('http://localhost:8000/api/contact.php', submitData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.status === 'success') {
                setSuccess(res.data.message);
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <Mail className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                <p className="text-xl text-gray-600">Have questions or feedback? We'd love to hear from you!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="What is this about?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Message *
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
                                placeholder="Your message..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-600 to-red-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-900 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                            <Send className="w-5 h-5" />
                            <span>{loading ? 'Sending...' : 'Send Message'}</span>
                        </button>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                        <div className="space-y-4 text-gray-600">
                            <div>
                                <p className="font-semibold">Email</p>
                                <p>support@devpaste.com</p>
                            </div>
                            <div>
                                <p className="font-semibold">Response Time</p>
                                <p>We typically respond within 24-48 hours</p>
                            </div>
                            <div>
                                <p className="font-semibold">Business Hours</p>
                                <p>Monday - Friday, 9 AM - 6 PM EST</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-600 to-red-800 rounded-xl shadow-lg p-8 text-white">
                        <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                        <p className="mb-4">Check out our documentation or browse frequently asked questions.</p>
                        <a href="/about" className="inline-block bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition">
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
