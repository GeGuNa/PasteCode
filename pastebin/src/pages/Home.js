import { Link } from 'react-router-dom';
import { Code, Zap, Shield, Users } from 'lucide-react';

export default function Home() {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center py-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Share Code <span className="text-orange-600">Instantly</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    The simplest way to store and share code snippets. 
                    No account required for public pastes.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link 
                        to="/create" 
                        className="bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
                    >
                        Create Paste
                    </Link>
                    <Link 
                        to="/register" 
                        className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-50 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <Zap className="w-12 h-12 text-orange-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                    <p className="text-gray-600">Create and share code snippets in seconds without any hassle.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <Shield className="w-12 h-12 text-orange-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                    <p className="text-gray-600">Choose between public and private pastes. Your code stays safe.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <Users className="w-12 h-12 text-orange-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Account Needed</h3>
                    <p className="text-gray-600">Start sharing immediately. Create account for history and settings.</p>
                </div>
            </div>
        </div>
    );
}
