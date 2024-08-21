'use client'
import React, { useState, useEffect } from 'react';

const MiniNavbar = ({ activeIndex, onNavChange } : any) => {
  const links = [
    { name: 'Page 1', color: 'bg-green-500' },
    { name: 'Page 2', color: 'bg-purple-500' },
    { name: 'Page 3', color: 'bg-orange-500' },
    { name: 'Page 4', color: 'bg-red-500' },
  ];

  return (
    <div className='flex space-x-4 bg-gray-100 p-4 rounded-lg'>
      {links.map((link, index) => (
        <button
          key={index}
          onClick={() => onNavChange(index)}
          className={`px-4 py-2 rounded ${link.color} ${
            activeIndex === index ? 'underline' : ''
          } text-white`}
        >
          {link.name}
        </button>
      ))}
    </div>
  );
};

const Hub = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const content = [
    'Content for Page 1',
    'Content for Page 2',
    'Content for Page 3',
    'Content for Page 4',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [content.length]);

  return (
    <div className='min-h-screen p-8'>
      <MiniNavbar activeIndex={activeIndex} onNavChange={setActiveIndex} />
      <div className='mt-8'>
        <h2 className='text-2xl font-bold'>{content[activeIndex]}</h2>
        <p className='mt-4'>This is the content for {content[activeIndex]}</p>
      </div>
    </div>
  );
};

export default Hub;
