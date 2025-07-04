"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Carousel, IconButton } from "@material-tailwind/react";
import Footer from "../components/footer";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if all required fields are filled
    if (!formData.name || !formData.companyName || !formData.service || !formData.message) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Thank you for your message. We will get back to you soon!');
        setFormData({
          name: '',
          companyName: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex w-full flex-col min-h-screen">
      <div className="relative h-[600px] sm:h-[700px] md:h-[800px] w-full">
        <Image
          src="/img/contact/m-bg.png"
          alt="Mobile background showing iGaming business interface"
          width={1920}
          height={1080}
          className="w-full h-full brightness-110 md:hidden"
          priority
          sizes="100vw"
        />
        <Image
          src="/img/contact/bg.png"
          alt="Desktop background showing iGaming business interface"
          width={1920}
          height={1080}
          className="w-full h-full brightness-110 hidden md:block"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 ">
          <div className="container mx-auto px-4 h-full flex flex-col md:justify-center mt-16 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}

              className="max-w-2xl text-left md:text-left text-center mx-auto md:mx-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Let&apos;s Take Your iGaming Business to the Next Level
              </h1>
              <p className="text-[22px] md:text-2xl text-white mb-8 mt-16 md:my-16">
                Get in touch with our expert team to discuss how we can help you achieve your goals.
              </p>
              <div className="flex justify-center md:justify-start">


                <Button size="lg" className="rounded-full text-black bg-white mt-16 md:mt-0" >
                  <a href="https://calendar.app.google/9RhX95NA3kyXy2F46" target="_blank">Schedule a Free Consultation</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
          <div
            className="w-full h-full absolute left-0 md:block hidden"
            style={{
              zIndex: -1,
              transform: `translateY(${scrollY * 0.3 - 100}px)`,
              pointerEvents: "none",
            }}>
            <img src="./img/bg/bg-3.png" className=" w-full h-full"></img>
          </div>
            <h2 className="text-2xl md:text-4xl font-bold max-w-4xl mx-auto">
              At Aff-Starter, we&apos;re passionate about supporting iGaming brands like yours. Whether you need affiliate management, CRM solutions, or social media expertise, our team is here to help.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-[10%] px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-cyan-400 rounded-3xl p-8 shadow-lg hover:animate-scale"
            >
              <h3 className="text-2xl font-bold mb-2">Lloyd Slade</h3>
              <p className="text-lg font-semibold mb-2">CEO / CMO</p>
              <a href="mailto:lloyd@aff-starter.com" className="text-blue-900 block hover:text-blue-700 font-bold font-['regular']">
                Email: lloyd@aff-starter.com
              </a>
              <a href="https://t.me/AffStarter"  target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-700 font-bold font-['regular']">
                Telegram: @AffStarter
              </a>
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-purple-500 rounded-3xl p-8 shadow-lg hover:animate-scale"
            >
              <h3 className="text-2xl font-bold mb-2 text-white">Edmond Gevorgyan</h3>
              <p className="text-lg font-semibold mb-2 text-white">Director of Affiliation</p>
              <a href="mailto:edmond@aff-starter.com" className="text-blue-100 block hover:text-blue-200 font-['regular']">
                Email: edmond@aff-starter.com
              </a>
              <a href="https://t.me/igaming2004"  target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-blue-200 font-['regular']">
                Telegram: @igaming2004
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-purple-500 rounded-3xl p-8 shadow-lg hover:animate-scale"
            >
              <h3 className="text-2xl font-bold mb-2 text-white">Emma Slade</h3>
              <p className="text-lg font-semibold mb-2 text-white">Projects Director</p>
              <a href="mailto:emma@aff-starter.com" className="text-blue-100 hover:text-blue-200 font-['regular']">
                Email: emma@aff-starter.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-cyan-400 rounded-3xl p-8 shadow-lg hover:animate-scale"
            >
              <h3 className="text-2xl font-bold mb-2">Lim Kim San</h3>
              <p className="text-lg font-semibold mb-2">Chief Technology Officer</p>
              <a href="mailto:lim@aff-starter.com" className="text-blue-900 block hover:text-blue-700 font-['regular']">
                Email: lim@aff-starter.com
              </a>
              <a href="https://t.me/Indefatigable626"  target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-700 font-['regular']">
                Telegram: @Indefatigable626
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative  px-4  contact md:py-32 pt-64 pb-12"  style={{
          // backgroundImage: "url('/img/pricing/services.png')",
          backgroundSize: "100% 100%",
          paddingTop: "10.25%",
        }}>

      
       
          <div className="container mx-auto max-w-2xl relative z-10 px-4 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-center mb-8">Schedule a Consultation</h2>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    type="text" 
                    name="name"
                    label="Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="!border-t-blue-gray-200 focus:!border-cyan-400 focus:!border-t-0 focus:!outline-none"
                    labelProps={{
                      className: "!text-blue-gray-400"
                    }}
                  />
                  
                  <Input 
                    type="email" 
                    name="email"
                    label="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="!border-t-blue-gray-200 focus:!border-cyan-400 focus:!border-t-0 focus:!outline-none"
                    labelProps={{
                      className: "!text-blue-gray-400"
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    type="text" 
                    name="companyName"
                    label="Company Name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="!border-t-blue-gray-200 focus:!border-cyan-400 focus:!border-t-0 focus:!outline-none"
                    labelProps={{
                      className: "!text-blue-gray-400"
                    }}
                  />
                  
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required 
                    className="w-full h-10 border-b border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-cyan-400 focus:outline-0"
                  >
                    <option value="" disabled selected>Service</option>
                    <option value="affiliate">Affiliate Management</option>
                    <option value="crm">CRM Solutions</option>
                    <option value="social">Social Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <textarea 
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full border-b border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-cyan-400 focus:outline-0 resize-none"
                ></textarea>

               <div className="flex justify-center">
                  <Button 
                    type="submit"
                    className="rounded-full bg-cyan-400 px-8"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>


      <div className="">
        <Footer></Footer>
      </div>
    </main>
  );
}
