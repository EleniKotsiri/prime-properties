import Link from 'next/link';

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>Welcome to PrimeProperties. By accessing and using our website, you agree to the following terms and conditions.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. User Responsibilities</h2>
        <p>Users must provide accurate information when listing properties. Any fraudulent or misleading listings will be removed.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Property Listings & Content</h2>
        <p>All property listings must comply with local regulations. We reserve the right to remove any content that violates our policies.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Payments & Transactions</h2>
        <p>We are not responsible for transactions between users. Ensure you verify all details before making payments.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Liability Disclaimer</h2>
        <p>We do not guarantee the accuracy of listings and are not liable for any disputes between users.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
        <p>We may update these terms from time to time. Please check this page periodically for any changes.</p>
      </section>
      
      <p className="mt-6 text-gray-600">If you have any questions, please contact us at <Link href="/contact" className="text-blue-600">our contact page</Link>.</p>
    </div>
  );
};

export default TermsPage;
