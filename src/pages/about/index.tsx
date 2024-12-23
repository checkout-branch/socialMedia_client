import React from "react";

const AboutPage = () => {
  return (
    <div className="text-gray-200 mt-4 px-6 mr-10">
      <div className="container mx-auto">
        {/* About Us Section */}
        <div className="mb-8 bg-[#272932] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white">About Us</h2>
          <p className="mt-4 text-gray-300">
            Welcome to <span className="text-purple-500 font-bold">GamSphere</span>, the ultimate social platform for gamers! Our mission is to bring together gaming enthusiasts from around the globe into one vibrant community. Whether you’re a casual gamer, an esports pro, or a developer passionate about creating games, Gamsphere is your space to connect, share, and grow.
          </p>
        </div>

        {/* Legal Information Section */}
        <div className="mb-8 bg-[#272932] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white">Legal Information</h2>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>✅ Gamsphere ensures data security and privacy for all users.</li>
            <li>✅ We do not share user data with third parties without consent.</li>
            <li>✅ Our terms of service align with the latest industry standards.</li>
            <li>✅ By joining Gamsphere, you agree to our community guidelines.</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="col-span-2 bg-[#272932] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-6">
              Have questions? We’d love to hear from you! Reach out to us for support, feedback, or partnerships.
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="text-purple-500 hover:text-purple-400"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a
                href="#"
                className="text-purple-500 hover:text-purple-400"
                aria-label="Discord"
              >
                <i className="fab fa-discord text-2xl"></i>
              </a>
              <a
                href="#"
                className="text-purple-500 hover:text-purple-400"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
            <form>
              <div className="flex space-x-4 items-center">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-1/2 p-2 bg-[#1a1c26] text-gray-300 border border-gray-700 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-1/2 p-2 bg-[#1a1c26] text-gray-300 border border-gray-700 rounded"
                />
                <button className="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Discord CTA */}
          <div className="col-span-1 bg-[#272932] p-6 rounded-lg shadow-md flex items-center justify-center">
            <div className="text-center">
              <i className="fab fa-discord text-6xl text-purple-500"></i>
              <h3 className="mt-4 text-white text-xl font-bold">
                Click to Join Our
              </h3>
              <a
                href="#"
                className="text-purple-500 text-3xl font-bold hover:text-purple-400"
              >
                DISCORD
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
