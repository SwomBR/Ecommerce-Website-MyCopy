import React, { useState, useEffect } from "react";

const testimonials = [
  {
    img: "https://randomuser.me/api/portraits/women/43.jpg",
    text: `"This service completely transformed our business. The team was professional, responsive, and delivered beyond our expectations. Highly recommended!"`,
    name: "Sarah Johnson",
    title: "CEO, TechSolutions Inc.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    text: `"I've worked with many companies over the years, but none have shown the level of dedication and expertise that this team demonstrates every day."`,
    name: "Michael Chen",
    title: "Marketing Director, Global Corp",
  },
  {
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    text: `"The results speak for themselves. Our productivity increased by 40% after implementing their solution. Worth every penny!"`,
    name: "Lisa Rodriguez",
    title: "Operations Manager, BrightFuture",
  },
  {
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    text: `"Exceptional service from start to finish. They took the time to understand our unique needs and delivered a customized solution that works perfectly."`,
    name: "David Wilson",
    title: "Founder, Startup Ventures",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          What Our Clients Say
          <span className="block w-16 h-1 bg-blue-500 mx-auto mt-2"></span>
        </h2>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="min-w-full px-4 flex justify-center items-center"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 max-w-2xl mx-auto relative">
                  <div className="absolute top-4 left-6 text-gray-200 text-8xl font-serif select-none">
                    “
                  </div>
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-20 h-20 mx-auto rounded-full border-4 border-white shadow-md mb-6 object-cover"
                  />
                  <p className="text-gray-600 italic mb-6 text-lg">{t.text}</p>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{t.title}</p>
                </div>
              </div>
            ))}
          </div>

           <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
