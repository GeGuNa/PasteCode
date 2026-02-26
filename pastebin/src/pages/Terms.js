export default function Terms() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-600 leading-relaxed">
                        By accessing and using DevPaste, you accept and agree to be bound by the terms 
                        and provisions of this agreement. If you do not agree to these terms, please do 
                        not use this service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To access certain features, you may be required to create an account. You are 
                        responsible for maintaining the confidentiality of your account credentials and 
                        for all activities that occur under your account.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Code Content</h2>
                    <p className="text-gray-600 leading-relaxed">
                        You retain ownership of any code you submit to DevPaste. However, by posting 
                        content, you grant us a license to store, display, and distribute your content 
                        through our service. You are responsible for ensuring you have the right to 
                        share any code you post.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibited Conduct</h2>
                    <p className="text-gray-600 leading-relaxed">
                        You agree not to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                        <li>Post malicious, harmful, or illegal code</li>
                        <li>Share sensitive information (passwords, API keys, etc.)</li>
                        <li>Violate any third-party licenses or copyrights</li>
                        <li>Use the service for spam or unauthorized commercial purposes</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Your use of DevPaste is also governed by our Privacy Policy. We collect and 
                        process your data in accordance with applicable privacy laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Service Modifications</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We reserve the right to modify or discontinue the service at any time without 
                        prior notice. We are not liable for any modification, suspension, or 
                        discontinuation of the service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                    <p className="text-gray-600 leading-relaxed">
                        DevPaste is provided "as is" without any warranties. We are not liable for any 
                        damages arising from the use or inability to use the service, including but not 
                        limited to loss of data or code.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have any questions about these Terms, please contact us at 
                        <a href="/contact" className="text-orange-600 hover:underline"> support@devpaste.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
