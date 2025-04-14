
import { motion } from "framer-motion";
import { Network, Wifi, Router } from "lucide-react";
import Parallax from "./Parallax";

const networkServices = [
  {
    icon: <Network className="w-12 h-12" />,
    title: "Home Network Setup",
    description: "Professional installation of secure and reliable home networks",
    features: [
      "High-speed WiFi coverage throughout your home",
      "Wired network installation for gaming and home office",
      "Network security setup and configuration",
      "Smart home device integration"
    ],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    icon: <Router className="w-12 h-12" />,
    title: "Office Network Setup",
    description: "Enterprise-grade networking solutions for businesses",
    features: [
      "Structured cabling and network infrastructure",
      "Secure wireless network deployment",
      "VPN and remote access setup",
      "Network monitoring and maintenance",
      "Scalable network architecture design"
    ],
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
  }
];

const NetworkServices = () => {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900" id="network-services">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            Professional Network Solutions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Expert network installation and configuration services for homes and businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {networkServices.map((service, index) => (
            <Parallax key={index} offset={20}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-primary mr-4">{service.icon}</div>
                    <h3 className="text-2xl font-semibold dark:text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                        <Wifi className="w-4 h-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NetworkServices;
