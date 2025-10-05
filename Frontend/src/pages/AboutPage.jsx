import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 md:px-12 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home <span className="mx-2">›</span>
        <span className="text-blue-700 font-medium">About Us</span>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
        About Us
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Content */}
        <div className="md:w-2/3 space-y-6 leading-relaxed">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-blue-800">
              Durocap Roofing India Pvt. Ltd.
            </span>
            , a name synonymous with excellence in roofing products. Our journey
            began with a vision to provide unparalleled roofing solutions, and
            today, our products are trusted and acclaimed globally, from the
            northernmost points to the southernmost corners of the Earth.
          </p>

          <p>
            At <span className="font-semibold">DUROCAP</span>, we take immense
            pride in our comprehensive range of roofing solutions catering to
            commercial, residential, and industrial needs. Our commitment to
            quality has propelled us to the forefront of the industry, and our
            products are revered for their exceptional durability and superior
            performance. When you choose DUROCAP, you choose roofing that stands
            the test of time.
          </p>

          <p>
            Our flagship DUROCAP tiles exemplify the pinnacle of quality and
            reliability. Crafted to outlast and outshine, they offer a level of
            durability that surpasses industry standards. With built-in
            anti-fungal properties, we ensure not just a roof but a shield
            against the elements. Each design detail is meticulously curated to
            marry aesthetics with functionality, giving you a roof that’s as
            visually appealing as it is robust.
          </p>

          <p>
            Your safety is our priority, and our tiles are engineered to provide
            unparalleled protection. Under the shelter of DUROCAP tiles, you'll
            find more than just a roof – you'll find peace of mind. Trust is at
            the heart of everything we do, and we are honored to be the choice
            of countless homeowners and businesses alike.
          </p>

          <p>
            Our DUROCAP interlocking roof tiles stand as a testament to our
            commitment to innovation. These exceptional quality tiles come in a
            spectrum of shades, thoughtfully designed to cater to the unique
            preferences of each customer. Whether your style is traditional or
            contemporary, we have a tile that resonates with you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
