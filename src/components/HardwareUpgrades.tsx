
import { motion } from "framer-motion";
import { Cpu, HardDrive, Fan } from "lucide-react";
import Parallax from "./Parallax";

const upgrades = [
  {
    icon: <Cpu className="w-12 h-12" />,
    title: "CPU Upgrades",
    description: "Boost your computer's processing power with modern CPU upgrades.",
    benefits: ["Faster processing", "Better multitasking", "Improved performance"]
  },
  {
    icon: <HardDrive className="w-12 h-12" />,
    title: "SSD Installation",
    description: "Transform your PC's speed with lightning-fast SSD storage.",
    benefits: ["Quick boot times", "Instant app loading", "Faster file transfers"]
  },
  {
    icon: <Cpu className="w-12 h-12" />,
    title: "RAM Upgrades",
    description: "Enhance multitasking with additional memory capacity.",
    benefits: ["Smooth multitasking", "Better app performance", "No more freezing"]
  },
  {
    icon: <Fan className="w-12 h-12" />,
    title: "Cooling Solutions",
    description: "Optimize your PC's temperature for sustained performance.",
    benefits: ["Prevent throttling", "Longer component life", "Stable performance"]
  }
];

const HardwareUpgrades = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-muted dark:from-gray-900 dark:to-secondary" id="hardware">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            Hardware Upgrades
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your old PC with our professional hardware upgrade services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {upgrades.map((upgrade, index) => (
            <Parallax key={index} offset={20}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-primary mb-4">{upgrade.icon}</div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{upgrade.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{upgrade.description}</p>
                <ul className="space-y-2">
                  {upgrade.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HardwareUpgrades;
