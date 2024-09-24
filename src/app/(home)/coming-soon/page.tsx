"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/global/Button';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status) {
      timer = setTimeout(() => {
        setStatus('');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setStatus('Subscribing...');

    try {
      const response = await fetch('https://smp.jacinthsolutions.com.au/api/v1/util/blog/subscribe-to-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('Subscribed successfully!');
        setEmail('');
      } else {
        setStatus('Subscription failed. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center p-10 lg:p-20"
      style={{ backgroundImage: "url('/assets/images/coming-soon/bg.png')" }}
    >
      <div className="flex-grow flex items-center justify-start">
        <div className="text-white p-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-clashSemiBold font-bold mb-4">Coming soon!</h1>
          <p className="text-lg md:text-2xl font-satoshiMedium mb-6 tracking-wider my-4">We are working on this feature, Subscribe to our mailing list to get notifications and updates.</p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex items-center justify-between bg-[#E5E5E56B]/40 py-1 pl-2 pr-4 max-w-md rounded-full">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none font-satoshi p-3 w-full max-w-xs outline-none bg-transparent text-white placeholder:text-white placeholder:font-satoshi text-lg placeholder:text-lg"
              />
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="py-3 px-5 bg-tc-orange text-white rounded-full disabled:opacity-50 border-none disabled:cursor-not-allowed"
              >
                Subscribe
              </Button>
            </div>
          </form>
          {status && <p className="text-white font-satoshiMedium mt-2">{status}</p>}
        </div>
      </div>

      {/* Social Media Icons - Positioned Bottom Right */}
      <div className="absolute bottom-4 right-4 lg:bottom-28 lg:right-20">
        <p className="text-white font-satoshiBold text-lg lg:text-xl mb-5 text-right">Connect with us on:</p>
        <div className="flex space-x-4">
          <Link href="https://www.instagram.com/oloja_au?igsh=dzRuYW52MjZ4bjJq" className="text-white">
            <Image
              src="/assets/images/coming-soon/instagram.png"
              alt="Instagram"
              width={30}
              height={30}
            />
          </Link>
          <Link href="#" className="text-white">
            <Image
              src="/assets/images/coming-soon/youtube.png"
              alt="YouTube"
              width={30}
              height={30}
            />
          </Link>
          <Link href="#" className="text-white">
            <Image
              src="/assets/images/coming-soon/twitter.png"
              alt="Twitter"
              width={30}
              height={30}
            />
          </Link>
          <Link href="#" className="text-white">
            <Image
              src="/assets/images/coming-soon/facebook.png"
              alt="Facebook"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;