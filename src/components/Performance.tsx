
import { motion } from "framer-motion";

const performanceMetrics = [
  { label: "Faster Boot Time", value: "70%" },
  { label: "Improved Speed", value: "85%" },
  { label: "Storage Optimized", value: "60%" },
  { label: "Better Response", value: "90%" },
];

const Performance = () => {
  return (
    <section className="py-20 px-4 bg-secondary text-white dark:bg-gray-800">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Performance Improvements
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Real results from our optimization services
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-sm md:text-base text-gray-300">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Performance;
