'use client';
import React, { useState } from 'react';
import { 
  Home,
  LogIn,
  NewspaperIcon,
  PenLine,
  UserCircle,
  Share2,
  Trophy,
  Heart
} from 'lucide-react';
import { 
  VerticalTimeline, 
  VerticalTimelineElement 
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const UserJourneyRoadmap = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    {
      icon: <Home className="w-full h-full text-white transform transition-transform duration-300 hover:scale-110" />,
      title: "Start Your Journey",
      description: "Welcome to our travel community! Begin by exploring our homepage filled with inspiring travel stories.",
      iconBg: "#2563eb",
      date: "Step 1",
      bgGradient: "from-blue-300 to-blue-400",
      position: "left"
    },
    {
      icon: <LogIn className="w-full h-full text-white transform transition-transform duration-300 hover:scale-110" />,
      title: "Join the Community",
      description: "Create your account or log in to access all features and connect with fellow travelers.",
      iconBg: "#3b82f6",
      date: "Step 2",
      bgGradient: "from-blue-200 to-blue-300",
      position: "right"
    },
    {
      icon: <NewspaperIcon className="w-full h-full text-white transform transition-transform duration-300 hover:scale-110" />,
      title: "Discover the Newsfeed",
      description: "Explore travel stories, tips, and guides from our global community of adventurers.",
      iconBg: "#60a5fa",
      date: "Step 3",
      bgGradient: "from-blue-300 to-blue-400",
      position: "left"
    },
    {
      icon: <PenLine className="w-full h-full text-white transform transition-transform duration-300 hover:scale-110" />,
      title: "Share Your Story",
      description: "Create your first post! Share your travel experiences, photos, and tips with our community.",
      iconBg: "#93c5fd",
      date: "Step 4",
      bgGradient: "from-blue-200 to-blue-300",
      position: "right"
    },
    {
      icon: <UserCircle className="w-full h-full text-white transform transition-transform duration-300 hover:scale-110" />,
      title: "Personalize Your Profile",
      description: "Make your profile unique! Add your photo, bio, and showcase your travel achievements.",
      iconBg: "#2563eb",
      date: "Step 5",
      bgGradient: "from-blue-300 to-blue-400",
      position: "left"
    },
    {
      icon: <Share2 className="w-full h-full text-white transform transition-transform duration-300 hover:scale-110" />,
      title: "Connect with Travelers",
      description: "Follow other travelers, engage with their content, and build your travel network.",
      iconBg: "#3b82f6",
      date: "Step 6",
      bgGradient: "from-blue-200 to-blue-300",
      position: "right"
    },
    {
      icon: <Trophy className="w-full h-full text-white transform transition-transform duration-300 hover:scale-110" />,
      title: "Get Verified",
      description: "Earn upvotes and become a verified user to access premium content and features.",
      iconBg: "#60a5fa",
      date: "Step 7",
      bgGradient: "from-blue-300 to-blue-400",
      position: "left"
    },
    {
      icon: <Heart className="w-full h-full text-white transform transition-transform duration-300 hover:scale-110" />,
      title: "Enjoy Premium Benefits",
      description: "Access exclusive content, get special badges, and enjoy an ad-free experience.",
      iconBg: "#93c5fd",
      date: "Step 8",
      bgGradient: "from-blue-200 to-blue-300",
      position: "right"
    }
  ];

  return (
    <section className="py-16 light:bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 ">
            Your Travel Journey Starts Here
          </h2>
          <p className="light:text-gray-600 text-lg">
            Follow these steps to make the most of our travel community
          </p>
        </div>

        <VerticalTimeline animate={true} lineColor="#93c5fd">
          {steps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <VerticalTimelineElement
                className={`vertical-timeline-element ${
                  hoveredIndex === index ? 'scale-105' : ''
                }`}
                contentArrowStyle={{ 
                  borderRight: step.position === 'left' ? '7px solid #ffffff' : 'none',
                  borderLeft: step.position === 'right' ? '7px solid #ffffff' : 'none'
                }}
                contentStyle={{ 
                  background: '#ffffff',
                  boxShadow: hoveredIndex === index 
                    ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                    : '0 3px 10px rgb(0 0 0 / 0.1)',
                  borderRadius: '0.75rem',
                  border: '1px solid #f0f0f0',
                  transform: `translateY(${hoveredIndex === index ? '-8px' : '0'})`,
                  transition: 'all 0.3s ease-in-out',
                }}
                date={step.date}
                icon={step.icon}
                iconStyle={{ 
                  background: step.iconBg,
                  boxShadow: '0 0 0 4px #ffffff, inset 0 2px 0 rgb(0 0 0 / 0.1), 0 3px 10px 0 rgb(0 0 0 / 0.1)',
                }}
                position={step.position}
                visible={true}
              >
                <div className={`p-6 rounded-lg transition-all duration-300 bg-gradient-to-br ${
                  hoveredIndex === index ? 'opacity-100 scale-105' : 'opacity-0'
                } absolute inset-0 -z-10 ${step.bgGradient}`} />
                <h3 className="font-bold dark:text-gray-700 text-xl mb-2 relative z-10">{step.title}</h3>
                <p className="text-gray-600 relative z-10">{step.description}</p>
              </VerticalTimelineElement>
            </div>
          ))}
        </VerticalTimeline>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Start Your Journey Now
          </button>
          <p className="text-sm light:text-gray-500 mt-4">
            Join our community today and start exploring!
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserJourneyRoadmap;