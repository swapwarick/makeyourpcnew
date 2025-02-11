
import { motion } from "framer-motion";
import { User } from "lucide-react";

const testimonials = [
  {
    name: "Rajat Shukla",
    role: "Software Developer",
    content: "My 5-year-old laptop now runs like new! Incredible service.",
  },
  {
    name: "Adarsh Hegde",
    role: "Graphic Designer",
    content: "The performance boost after the upgrades is remarkable. Worth every penny!",
  },
  {
    name: "Sheena Dambelkar",
    role: "Business Owner",
    content: "Their network setup transformed our home office connectivity. Excellent service!",
  },
  {
    name: "Ajit Singh",
    role: "Corporate Manager",
    content: "Professional network installation for our entire office. Seamless execution and great support.",
  },
  {
    name: "Mamta Tiwari",
    role: "Business Owner",
    content: "Saved me from buying a new PC. The team really knows their stuff.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-white" id="testimonials">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-muted p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                  <User className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
