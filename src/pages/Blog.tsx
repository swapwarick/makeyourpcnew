
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: "ssd-ram-upgrade",
    title: "Boost Your PC Performance with SSD and RAM Upgrades",
    excerpt: "Learn how upgrading your storage and memory can dramatically improve your computer's speed.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    readTime: "5 min read",
  },
  {
    id: "cpu-cooling",
    title: "Maximizing CPU Performance Through Better Cooling",
    excerpt: "Discover how proper cooling solutions can prevent throttling and boost your processor's performance.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    readTime: "4 min read",
  },
  {
    id: "software-optimization",
    title: "Essential Software Tweaks for a Faster PC",
    excerpt: "Simple software optimizations that can make your computer feel brand new again.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    readTime: "6 min read",
  },
  {
    id: "complete-upgrade-guide",
    title: "Complete PC Upgrade Guide: From Slow to Pro",
    excerpt: "A comprehensive guide to transforming your old PC into a high-performance machine.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    readTime: "8 min read",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            PC Optimization Blog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert advice and guides on upgrading and optimizing your PC
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/blog/${post.id}`}
                className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary mb-2">{post.readTime}</div>
                  <h2 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-gray-600">{post.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
