import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const testimonials = [
    {
      id: 1,
      name: "Dr. Anjali Sharma",
      position: "T&P Officer, IET Engineering College",
      image:
        "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600",
      quote:
        "T&P platform has completely transformed how we prepare our students for placements. The analytics help us identify areas where students need improvement, and the customizable tests allow us to simulate actual company assessments.",
    },
    {
      id: 2,
      name: "Prof. Rajesh Kumar",
      position: "Dean, School of Computer Engineering",
      image:
        "https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=600",
      quote:
        "Since implementing T&P, we've seen a 30% increase in our placement rates. The platform's detailed analytics and custom test creation capabilities have been instrumental in preparing our students.",
    },
    {
      id: 3,
      name: "Meera Patel",
      position: "Final Year Engineering Student",
      image:
        "https://images.pexels.com/photos/3759085/pexels-photo-3759085.jpeg?auto=compress&cs=tinysrgb&w=600",
      quote:
        "The practice tests on T&P helped me identify my weak areas and improve systematically. The detailed performance reports after each test were incredibly helpful, and I secured a position at my dream company.",
    },
  ];

  return (
    <section id="testimonials" className="section bg-gray-50">
      <div className="container-custom space-y-1">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Hear from colleges and students who have transformed their placement
            preparation with T&P
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-accent-500 fill-accent-500"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {showMore ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="text-accent-500 fill-accent-500"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div
                onClick={() => setShowMore(!showMore)}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                View less
                <ChevronRight size={20} className="ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div
              onClick={() => setShowMore(!showMore)}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View more success stories
              <ChevronRight size={20} className="ml-1" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
