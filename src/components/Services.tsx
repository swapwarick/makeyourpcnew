import { motion } from "framer-motion";
import { Cpu, HardDrive, Zap, Shield, Network } from "lucide-react";

const services = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Hardware Upgrades",
    description: "Strategic component upgrades to maximize performance within your budget.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance Tuning",
    description: "Optimize your system settings for peak efficiency and speed.",
  },
  {
    icon: <Network className="w-8 h-8" />,
    title: "Professional Network Solutions",
    description: "Expert network setup and configuration for homes and businesses.",
  },
  {
    icon: <HardDrive className="w-8 h-8" />,
    title: "Storage Solutions",
    description: "SSD upgrades and storage optimization for faster load times.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "System Protection",
    description: "Security updates and optimization for long-term performance.",
  },
];

const Services = () => {
  return (
    <section className="py-20 px-4 bg-muted" id="services">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-secondary mb-4"
          >
            Our Services
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive PC optimization services to enhance your computer's performance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
