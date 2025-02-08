
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const blogContent = {
  "ssd-ram-upgrade": {
    title: "Boost Your PC Performance with SSD and RAM Upgrades",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    content: `
      <h2>Why Upgrade Your Storage and Memory?</h2>
      <p>One of the most effective ways to breathe new life into an aging PC is through strategic hardware upgrades. Two components that offer the most noticeable improvements are your storage drive (upgrading to an SSD) and RAM.</p>
      
      <h3>The SSD Advantage</h3>
      <p>Solid State Drives (SSDs) can dramatically improve your computer's performance. Unlike traditional hard drives, SSDs have no moving parts and can access data almost instantly. This results in:</p>
      <ul>
        <li>Faster boot times (often under 30 seconds)</li>
        <li>Quick application launches</li>
        <li>Improved file transfer speeds</li>
        <li>Better overall system responsiveness</li>
      </ul>

      <h3>RAM Upgrade Benefits</h3>
      <p>Adding more RAM allows your computer to handle more tasks simultaneously. Benefits include:</p>
      <ul>
        <li>Smoother multitasking</li>
        <li>Better performance in memory-intensive applications</li>
        <li>Reduced system slowdowns</li>
        <li>Improved gaming performance</li>
      </ul>
    `
  },
  "cpu-cooling": {
    title: "Maximizing CPU Performance Through Better Cooling",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    content: `
      <h2>The Importance of CPU Cooling</h2>
      <p>Your processor's performance is directly tied to its operating temperature. Modern CPUs will automatically reduce their speed (thermal throttling) when they get too hot, significantly impacting performance.</p>

      <h3>Cooling Solutions</h3>
      <ul>
        <li>Replace thermal paste for better heat transfer</li>
        <li>Upgrade to a better CPU cooler</li>
        <li>Improve case airflow with strategic fan placement</li>
        <li>Consider liquid cooling for maximum performance</li>
      </ul>

      <h3>Benefits of Proper Cooling</h3>
      <p>With better cooling, you can:</p>
      <ul>
        <li>Maintain higher clock speeds</li>
        <li>Improve system stability</li>
        <li>Extend component lifespan</li>
        <li>Reduce system noise</li>
      </ul>
    `
  },
  "software-optimization": {
    title: "Essential Software Tweaks for a Faster PC",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    content: `
      <h2>Software Optimization Techniques</h2>
      <p>While hardware upgrades can provide significant performance improvements, software optimization can also make a substantial difference in your PC's performance.</p>

      <h3>Essential Optimizations</h3>
      <ul>
        <li>Clean up startup programs</li>
        <li>Uninstall unnecessary applications</li>
        <li>Update drivers and Windows</li>
        <li>Defragment HDD (not needed for SSDs)</li>
      </ul>

      <h3>Advanced Tweaks</h3>
      <p>For even better performance:</p>
      <ul>
        <li>Adjust Windows visual effects</li>
        <li>Configure power settings for performance</li>
        <li>Clean up temporary files regularly</li>
        <li>Optimize page file settings</li>
      </ul>
    `
  },
  "complete-upgrade-guide": {
    title: "Complete PC Upgrade Guide: From Slow to Pro",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    content: `
      <h2>Comprehensive PC Upgrade Strategy</h2>
      <p>Transform your old PC into a high-performance machine with this complete upgrade guide. We'll cover everything from assessment to implementation.</p>

      <h3>Step-by-Step Upgrade Process</h3>
      <ol>
        <li>Assess current performance bottlenecks</li>
        <li>Prioritize upgrades based on impact and budget</li>
        <li>Plan the upgrade sequence</li>
        <li>Implement changes systematically</li>
      </ol>

      <h3>Key Components to Consider</h3>
      <ul>
        <li>Storage: Switch to SSD for faster loading</li>
        <li>Memory: Upgrade RAM for better multitasking</li>
        <li>Processor: Consider CPU upgrade if necessary</li>
        <li>Graphics: Upgrade GPU for better visual performance</li>
      </ul>

      <h3>Post-Upgrade Optimization</h3>
      <p>After hardware upgrades, ensure optimal performance with:</p>
      <ul>
        <li>Fresh Windows installation</li>
        <li>Latest driver updates</li>
        <li>BIOS/UEFI optimization</li>
        <li>Performance monitoring and testing</li>
      </ul>
    `
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const post = id ? blogContent[id as keyof typeof blogContent] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center text-primary hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-secondary mb-6">{post.title}</h1>
            <div className="rounded-xl overflow-hidden mb-8 h-[400px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
