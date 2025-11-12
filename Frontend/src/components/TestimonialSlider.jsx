import React, { useState, useEffect } from "react";

const testimonials = [
  {
    text: `"I have contacted Mr. Rajesh for making a temporary building for our Panchakarma treatment section. After discussions, the plan was fixed. The sheets were green-colored UPVC and the sides were of V Panel. Their team made everything perfect with awesome workers under the supervision of an engineer. The work and team are superb. You can trust them for the best construction in a limited time period."`,
    name: "Dr. Balaji Subrahmonyan",
  },
  {
    text: `"I was looking for clay jaali for my house and finally heard about Durocap. Their wide range of jaali collections truly impressed me. Special thanks to Remya for her excellent assistance—knowledgeable, patient, and helpful. Their customer service was top-notch, and they even provided architectural consultations. Highly recommend Durocap Roofing Solutions!"`,
    name: "JiNi S J",
  },
  {
    text: `"Great service from DuroCap! Quality materials, timely completion, and a very professional team. Highly recommended for roofing solutions. Thank you!"`,
    name: "Jibin Varghese",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          What Our Clients Say
          <span className="block w-16 h-1 bg-blue-500 mx-auto mt-3"></span>
        </h2>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="min-w-full flex justify-center items-center px-4"
              >
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-2xl relative">
                  <div className="absolute top-4 left-6 text-gray-200 text-8xl font-serif select-none">
                  </div>
                  <p className="text-gray-700 italic leading-relaxed text-lg mb-6">
                    {t.text}
                  </p>
                  <h3 className="text-xl font-semibold text-blue-700">
                    — {t.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
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
