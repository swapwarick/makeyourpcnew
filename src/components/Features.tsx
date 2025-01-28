import { motion } from "framer-motion";
import Parallax from "./Parallax";
import { Zap, Clock, Tool, Shield } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-muted overflow-hidden">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <Parallax offset={30}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Person using laptop"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
            </div>
          </Parallax>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="p-3 bg-primary rounded-lg text-white">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast Results</h3>
                <p className="text-gray-600">Experience immediate performance improvements after our optimization service.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="p-3 bg-primary rounded-lg text-white">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
                <p className="text-gray-600">Most services completed within 24-48 hours.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="p-3 bg-primary rounded-lg text-white">
                <Tool className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Technicians</h3>
                <p className="text-gray-600">Skilled professionals with years of experience in PC optimization.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="p-3 bg-primary rounded-lg text-white">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Guaranteed Results</h3>
                <p className="text-gray-600">100% satisfaction guarantee or your money back.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;