function Privacy() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-24">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>

      <div className="prose dark:prose-invert">
        <h2 className="text-xl font-semibold">1. Information Collection</h2>
        <p className="mb-4">
          We collect only essential information needed to provide our 2D drawing services. This
          includes basic account details and usage data.
        </p>

        <h2 className="text-xl font-semibold">2. Data Usage</h2>
        <p className="mb-4">
          Your data is used solely to provide and improve our services. We do not sell or share your
          personal information with third parties.
        </p>

        <h2 className="text-xl font-semibold">3. Data Protection</h2>
        <p className="mb-4">
          We implement industry-standard security measures to protect your information from
          unauthorized access or disclosure.
        </p>

        <h2 className="text-xl font-semibold">4. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, modify, or delete your personal data at any time. Contact us
          for assistance with these requests.
        </p>
      </div>
    </div>
  );
}

export default Privacy;
