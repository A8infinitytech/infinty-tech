import { motion } from 'framer-motion';

export interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, description, icon, className = '' }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className={`bg-glass p-6 rounded-xl ${className}`}
  >
    {icon && <div className="mb-4 text-primary text-3xl">{icon}</div>}
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-secondaryText">{description}</p>
  </motion.div>
);
