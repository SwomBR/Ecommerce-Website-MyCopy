import React from "react";

const About = () => {
  const stats = [
    { number: "250+", text: "Projects Completed" },
    { number: "120+", text: "Happy Clients" },
    { number: "50+", text: "Team Members" },
    { number: "15+", text: "Years Experience" },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              About Our Company
              <span className="block w-16 h-1 bg-blue-500 mx-auto mt-2"></span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are a team of passionate professionals dedicated to delivering
              exceptional results for our clients.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1350&q=80"
                alt="Our Team"
                className="rounded-lg shadow-lg"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Our Story
              </h3>
              <p className="text-gray-600 mb-4">
                Founded in 2010, our company started as a small team of three
                people working out of a garage. Today, we've grown to over 100
                employees serving clients across the globe.
              </p>
              <p className="text-gray-600 mb-8">
                Our mission is to provide innovative solutions that help
                businesses thrive in the digital age. We believe in building
                long-term relationships with our clients based on trust,
                transparency, and exceptional service.
              </p>

              <a
                href="#"
                className="inline-block mt-4 px-6 py-3 text-white bg-blue-500 font-semibold rounded-full border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-100 rounded-lg py-8 text-center shadow-sm hover:-translate-y-2 transition-transform"
              >
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {item.number}
                </div>
                <div className="text-gray-600">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
