"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

type PackageCardProps = {
  name: string;
  features: string[];
  prices: { label: string; price: string }[];
  accent?: "red" | "amber";
};

function PackageCard({ name, features, prices, accent }: PackageCardProps) {
  const gradients: Record<string, string> = {
    red: "bg-gradient-to-br from-red-900 to-gray-900",
    amber: "bg-gradient-to-br from-amber-900 to-gray-900",
    default: "bg-gradient-to-br from-gray-900 to-gray-800",
  };
  const bars: Record<string, string> = {
    red: "bg-gradient-to-r from-red-600 to-red-400",
    amber: "bg-gradient-to-r from-amber-600 to-amber-400",
    default: "",
  };

  const bg = gradients[accent ?? "default"];
  const bar = bars[accent ?? "default"];

  return (
    <motion.div
      className={`${bg} text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative`}
      variants={itemVariants}
    >
      {bar && <div className={`${bar} h-2 rounded-t-lg mb-4`} />}
      <h4 className="text-xl font-bold mb-4 text-center">{name}</h4>
      <ul className="mb-6 space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start text-gray-300">
            <span className="text-red-500 mr-2 font-bold flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <div className={`grid grid-cols-${prices.length} gap-4 text-center`}>
        {prices.map((p) => (
          <div key={p.label}>
            <h5 className="text-sm font-semibold text-gray-300">{p.label}</h5>
            <p className="text-2xl font-bold text-white">{p.price}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const vehiclePrices = [
  { label: "Hatchback" },
  { label: "Sedan/UTE" },
  { label: "7 Seater" },
];

export function Packages() {
  return (
    <section id="packages" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl text-red-600 font-bold text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Packages
        </motion.h2>

        {/* Exterior Packages */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 className="text-3xl text-white font-bold text-center mb-8" variants={itemVariants}>
            Exterior Packages
          </motion.h3>
          <motion.div className="flex flex-wrap justify-center gap-6" variants={containerVariants}>
            <PackageCard
              name="Auto 1"
              features={[
                "Snow Foam Wash + Exterior Windows",
                "Door Frames + Tire & Rim Shine",
                "Regular Exterior Cleaning",
              ]}
              prices={[
                { label: "Hatchback", price: "$55" },
                { label: "Sedan/UTE", price: "$65" },
                { label: "7 Seater", price: "$75" },
              ]}
            />
            <PackageCard
              name="Deluxe"
              features={[
                "Foam Wash + Hand Wax",
                "Interior Quick Vacuum & Dust Wipe",
                "Tire & Rim Shine",
              ]}
              prices={[
                { label: "Hatchback", price: "$160" },
                { label: "Sedan/UTE", price: "$180" },
                { label: "7 Seater", price: "$200" },
              ]}
            />
            <PackageCard
              name="Super"
              features={[
                "Foam Wash + Single Stage Polish",
                "Spray Wax + Tire & Rim Shine",
                "Quick Interior Clean",
              ]}
              prices={[
                { label: "Hatchback", price: "$245" },
                { label: "Sedan/UTE", price: "$295" },
                { label: "7 Seater", price: "$345" },
              ]}
            />
          </motion.div>
        </motion.div>

        {/* Interior Packages */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 className="text-3xl text-white font-bold text-center mb-8" variants={itemVariants}>
            Interior Packages
          </motion.h3>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
            <PackageCard
              name="Plus"
              features={[
                "Interior Vacuum + Dust Wipe",
                "Snow Foam Wash + Exterior Wipe",
                "Spray Wax + Rim Shine",
              ]}
              prices={[
                { label: "Hatchback", price: "$105" },
                { label: "Sedan/UTE", price: "$125" },
                { label: "7 Seater", price: "$145" },
              ]}
            />
            <PackageCard
              name="Deluxe"
              features={[
                "Vacuum + Interior Panels Wipe",
                "Foam Wash + Spray Wax",
                "Tire & Rim Shine + 4 Doors Shampoo",
              ]}
              prices={[
                { label: "Hatchback", price: "$160" },
                { label: "Sedan/UTE", price: "$180" },
                { label: "7 Seater", price: "$200" },
              ]}
            />
            <PackageCard
              name="Super"
              features={[
                "Interior Shampoo + Steam Clean",
                "Leather Conditioner",
                "Foam Wash + Spray Wax",
              ]}
              prices={[
                { label: "Hatchback", price: "$245" },
                { label: "Sedan/UTE", price: "$295" },
                { label: "7 Seater", price: "$345" },
              ]}
            />
          </motion.div>
        </motion.div>

        {/* Exclusive Packages */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 className="text-3xl text-white font-bold text-center mb-8" variants={itemVariants}>
            Exclusive Packages
          </motion.h3>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
            <PackageCard
              name="Auto Elite"
              accent="red"
              features={[
                "Full Interior Care – Shampoo, Steam Clean, Air Blowing, Vacuum, Leather Conditioner",
                "Exterior Wash – Tires & Rims Cleaning + Spray Wax + Foam Wash",
                "Single Stage Polish – Removes light swirls for extra shine",
              ]}
              prices={[
                { label: "Hatchback", price: "$395" },
                { label: "Sedan/UTE", price: "$475" },
                { label: "7 Seater", price: "$545" },
              ]}
            />
            <PackageCard
              name="Auto Super Elite"
              accent="amber"
              features={[
                "Complete Interior – Shampoo, Steam Clean, Vacuum, Leather Conditioner",
                "Deep Exterior – Tar Removal, Clay Bar, & Engine Cleaning",
                "2-3 Stage Polish + Spray Wax – Professional finish & protection",
              ]}
              prices={[
                { label: "Hatchback", price: "$999" },
                { label: "Sedan/UTE", price: "$1250" },
                { label: "7 Seater", price: "$1500" },
              ]}
            />
          </motion.div>
        </motion.div>

        {/* Additional Services */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 className="text-3xl text-white font-bold text-center mb-8" variants={itemVariants}>
            Additional Services
          </motion.h3>

          {/* Paint Correction */}
          <motion.div className="mb-8" variants={containerVariants}>
            <motion.h4 className="text-2xl text-white font-bold text-center mb-6" variants={itemVariants}>
              Paint Correction
            </motion.h4>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
              {[
                { label: "Single Stage Polish", price: "$395" },
                { label: "Two Stage Polish", price: "$595" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
                  variants={itemVariants}
                >
                  <h5 className="text-lg font-semibold text-gray-300 mb-2">{item.label}</h5>
                  <p className="text-3xl font-bold text-white">{item.price}</p>
                </motion.div>
              ))}
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl md:col-span-2"
                variants={itemVariants}
              >
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Three Stage Polish</h5>
                <p className="text-3xl font-bold text-white">$750</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Add-ons */}
          <motion.div className="mb-8" variants={containerVariants}>
            <motion.h4 className="text-2xl text-white font-bold text-center mb-6" variants={itemVariants}>
              Add-ons
            </motion.h4>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
                variants={itemVariants}
              >
                <ul className="space-y-3">
                  {[
                    { label: "Tar Removal", price: "$50–100" },
                    { label: "Pet Hair Removal", price: "$50–100" },
                    { label: "Odour Treatment", price: "$50" },
                  ].map((item) => (
                    <li key={item.label} className="grid grid-cols-2 items-center gap-4 text-gray-300">
                      <span className="flex items-center">
                        <span className="text-red-500 mr-2 font-bold">✓</span>
                        {item.label}
                      </span>
                      <span className="text-right text-2xl font-bold text-white">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
                variants={itemVariants}
              >
                <ul className="space-y-3">
                  {[
                    { label: "Per Panel Polish", price: "$100" },
                    { label: "Headlight Restoration", price: "$45" },
                    { label: "Red Dirt Removal", price: "$100–150" },
                    { label: "Ceramic Coating", price: "From $850" },
                  ].map((item) => (
                    <li key={item.label} className="grid grid-cols-2 items-center gap-4 text-gray-300">
                      <span className="flex items-center">
                        <span className="text-red-500 mr-2 font-bold">✓</span>
                        {item.label}
                      </span>
                      <span className="text-right text-2xl font-bold text-white">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
