import { Code, Users, Shield, Zap } from 'lucide-react';

export default function About() {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <Code className="w-20 h-20 text-orange-600 mx-auto mb-6" />
                <h1 className="text-5xl font-bold text-gray-900 mb-6">About DevPaste</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    DevPaste is a modern code sharing platform designed for developers, by developers. 
                    We make it easy to share, store, and collaborate on code snippets.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To provide developers with a simple, secure, and efficient way to share code snippets. 
                        We believe in making code collaboration accessible to everyone, from beginners to 
                        experienced professionals.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To become the go-to platform for developers worldwide to share knowledge, 
                        collaborate on projects, and build a stronger coding community together.
                    </p>
                </div>
            </div>

            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose DevPaste?</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <Zap className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
                        <p className="text-gray-600 text-sm">Create and share code in seconds</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2">Secure</h3>
                        <p className="text-gray-600 text-sm">Your code is protected and private</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <Code className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2">Multi-Language</h3>
                        <p className="text-gray-600 text-sm">Support for 10+ programming languages</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2">Community</h3>
                        <p className="text-gray-600 text-sm">Join thousands of developers</p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl shadow-lg p-12 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl mb-8">Join our community of developers today!</p>
                <a href="/register" className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
                    Create Free Account
                </a>
            </div>
        </div>
    );
}
