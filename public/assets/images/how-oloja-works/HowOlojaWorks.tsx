'use client';
import {Link} from 'react-router-dom';
import Guarantee from '../components/Guarantee';
import WaveTick from '../components/WaveTick';
import Wave from '../components/Wave';
import {motion} from 'framer-motion';

const perks: {title: string; text: string}[] = [
  {
    title: 'Low Connection Fee',
    text: 'We keep our fees low, so you keep more of what you earn.'
  },
  {
    title: 'Work on Your Terms ',
    text: 'Found a job that suits your skills and schedule? It’s yours to take. You’re in control every step of the way.'
  },
  {
    title: 'Secure Payments, Hassle-Free ',
    text: 'We secure customer payments upfront and transfer them to your verified account once the job is complete.'
  }
];

function HowOlojaWorks() {
  return (
    <div>
      <header className='max-w-7xl mx-auto pb-10'>
        <div className='flex justify-between overflow-hidden absolute -z-10 w-full top-0 left-0'>
          <div
            style={{
              position: 'relative',
              height: '500px',
              width: '250px',
              float: 'left',
              top: '-100px',
              zIndex: '2'
            }}
          >
            <div
              style={{
                height: '500px',
                width: '500px',
                borderRadius: '50%',
                backgroundImage:
                  'radial-gradient(circle, #fac588, transparent)',
                filter: 'blur(30px)',
                position: 'absolute',
                left: '-250px'
              }}
            ></div>
          </div>

          <div
            style={{
              position: 'relative',
              height: '500px',
              width: '250px',
              float: 'right',
              top: '-160px'
            }}
          >
            <div
              style={{
                height: '500px',
                width: '500px',
                borderRadius: '50%',
                backgroundImage:
                  'radial-gradient(circle, #856cb7, transparent)',
                filter: 'blur(70px)',
                position: 'absolute',
                right: '-200px'
              }}
            ></div>
          </div>
        </div>
        <h1 className='text-center font-semibold text-[#381F8C] text-3xl sm:text-4xl mb-10 mt-20'>
          Get Tasks Done. <br /> Compare Offers. <br /> Save time and energy
        </h1>
        <div className='w-max space-x-1 sm:space-x-4 mx-auto'>
          <Link
            to='/'
            className='bg-[#381F8C] text-[#EBE9F4] font-bold px-5 py-3 rounded-full'
          >
            Get started now
          </Link>
          <Link
            to='/'
            className='border-[0.5px] border-[#381F8C] text-[#381F8C] font-bold px-5 py-3 rounded-full'
          >
            Monetize your skills
          </Link>
        </div>
      </header>

      <div className='max-w-7xl mx-auto mb-10'>
        <section
          className='w-[93%] sm:w-[85%] mx-auto bg-cover bg-no-repeat relative overflow-clip rounded-3xl text-[#EBE9F4] mb-10'
          style={{backgroundImage: `url("/galaxy-bg.jpg")`}}
        >
          <Wave position='top' />
          <div className='bg-[#381F8C] bg-opacity-50 relative pt-1 pb-10 w-full h-full top-0 left-0 z-20'>
            <h3 className='font-semibold px-5 text-2xl text-center mt-5 sm:mt-8 mb-5 sm:mb-8'>
              Your Ultimate Guide for getting every{' '}
              <br className='hidden sm:block' /> task done.
            </h3>
            <p className='text-center text-base sm:text-xl font-medium mb-8'>
              Fast, easy and stress-free
            </p>
            <ul className='px-5 sm:px-10 space-y-20'>
              <li className='flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-10 mb-4'>
                <div className='relative border-x-[12px] border-[#C1BADB] border-t-[24px] lg:max-w-[400px] rounded-3xl border-b-[10px] overflow-y-clip'>
                  <div className='overflow-hidden'>
                    <img
                      src='/step-one.png'
                      alt='Step one'
                      className='w-full'
                    />
                  </div>
                  <motion.span
                    initial={{opacity: 0, right: -100}}
                    whileInView={{opacity: 1, right: -32}}
                    viewport={{once: true}}
                    transition={{duration: 0.9}}
                    className='absolute font-bold text-xs px-4 py-2 text-white bg-[#E58C06] rounded-xl bottom-20'
                  >
                    I need someone to do my cornrows
                  </motion.span>
                  <motion.span
                    initial={{opacity: 0, right: -100}}
                    whileInView={{opacity: 1, right: -8}}
                    viewport={{once: true}}
                    transition={{duration: 1.2}}
                    className='absolute font-bold text-xs px-4 py-2 text-white bg-[#E58C06] rounded-xl -right-2 bottom-5'
                  >
                    I need authentic local spice
                  </motion.span>
                </div>
                <div>
                  <h3 className='font-semibold text-2xl sm:text-3xl text-[#E58C06] mb-3 sm:mb-5'>
                    Briefly tell us what you need done
                  </h3>
                  <p className='text-xl sm:text-2xl mb-7 sm:mb-10'>
                    Explain what you require in clear and short sentences.
                  </p>
                  <Link
                    to='/'
                    className='border-[0.5px] border-[#381F8C] text-[#381F8C] bg-[#EBE9F4] font-bold px-5 py-3 rounded-full'
                  >
                    Post a task in 90 secs
                  </Link>
                </div>
              </li>
              <li className='flex flex-col lg:flex-row-reverse lg:items-center gap-4 sm:gap-10 mb-4'>
                <img
                  src='/step-two.png'
                  alt='Step three'
                  className='w-full lg:max-w-[400px]'
                />
                <div>
                  <h3 className='font-semibold text-2xl sm:text-3xl text-[#E58C06] mb-3 sm:mb-5'>
                    Determine how much you want to pay
                  </h3>
                  <p className='text-xl sm:text-2xl mb-7 sm:mb-10'>
                    This is not a set price. You can modify when you find your
                    potential experts if you need to
                  </p>
                  <Link
                    to='/'
                    className='border-[0.5px] border-[#381F8C] text-[#381F8C] bg-[#EBE9F4] font-bold px-5 py-3 rounded-full'
                  >
                    Post a task in 90 secs
                  </Link>
                </div>
              </li>
              <li className='flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-10 mb-4'>
                <div className='lg:min-w-[400px] relative'>
                  <img
                    src='/step-three.png'
                    alt='Step three'
                    className='w-full'
                  />
                  <WaveTick />
                </div>

                <div>
                  <h3 className='font-semibold text-2xl sm:text-3xl text-[#E58C06] mb-3 sm:mb-5'>
                    Pick your own PRO!
                  </h3>
                  <p className='text-xl sm:text-2xl mb-7 sm:mb-10'>
                    The ball’s in your court to hire the best match and get it
                    done your way. Check profiles, ratings, and reviews to guide
                    your choice. After the job, show appreciation by releasing
                    payment and leaving a review to share their great work!
                  </p>
                  <Link
                    to='/'
                    className='border-[0.5px] border-[#381F8C] text-[#381F8C] bg-[#EBE9F4] font-bold px-5 py-3 rounded-full'
                  >
                    Post a task in 90 secs
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <div className='py-14 mx-auto flex flex-col md:flex-row gap-5 items-center bg-white'>
            <div>
              <h2 className='text-primary mb-4 font-semibold text-3xl sm:text-4xl'>
                Whether it is a simple task or a complex task!{' '}
              </h2>
              <p className='font-bold text-lg sm:text-2xl text-[#140B31]'>
                Rest assured Olójà has you covered, Share what{' '}
                <span className='text-[#E58C06]'>you need done</span>, choose
                the <span className='text-[#E58C06]'>right help</span>. Done,
                just like that. Saving you{' '}
                <span className='text-[#E58C06]'>tone of time and energy.</span>
              </p>
            </div>
            <img
              src='/users-sp.png'
              alt='Picture of users and service providers'
              className='w-full md:w-[57%]'
            />
          </div>

          <div className='bg-[#381F8C] bg-opacity-50 relative pt-1 pb-10 w-full h-full top-0 left-0 z-20'>
            <ul className='space-y-20 py-10 px-5 sm:px-10'>
              <li className='flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-10 mb-4'>
                <img
                  src='/step-four.png'
                  alt='Step Four'
                  className='w-full lg:max-w-[400px]'
                />
                <div>
                  <h3 className='font-semibold text-2xl sm:text-3xl text-[#E58C06] mb-3 sm:mb-5'>
                    Stay Connected with Your Expert Every Step of the way
                  </h3>
                  <p className='text-xl sm:text-2xl mb-7 sm:mb-10'>
                    Find the right expert for your job with no upfront costs.
                    Chat securely, share details, and track progress to ensure
                    your job is done just the way you want.
                  </p>
                  <Link
                    to='/'
                    className='border-[0.5px] border-[#381F8C] text-[#381F8C] bg-[#EBE9F4] font-bold px-5 py-3 rounded-full'
                  >
                    Post a task in 90 secs
                  </Link>
                </div>
              </li>

              <li className='flex flex-col lg:flex-row-reverse lg:items-center gap-4 sm:gap-10 mb-4'>
                <div className='relative border-x-[12px] border-[#C1BADB] border-[24px] lg:min-w-[400px] rounded-3xl border-b-[10px]'>
                  <div className='bg-white pt-3'>
                    <img
                      src='/oloja-logo.png'
                      alt='Oloja logo'
                      className='w-3/12 mx-auto'
                    />
                    <p className='font-black text-2xl text-primary text-center mt-1 pb-40'>
                      Guarantees:
                    </p>
                  </div>
                  <Guarantee
                    text='A simple, safe process that keeps both you and the expert secure.'
                    top={90}
                    left={-60}
                    animateTo={-20}
                    delay={1}
                  />
                  <Guarantee
                    text='Your payment is protected until you’re satisfied.'
                    top={142}
                    left={-40}
                    animateTo={0}
                    delay={0.8}
                  />
                  <Guarantee
                    text='No cash handling—everything is done online.'
                    top={194}
                    left={0}
                    animateTo={20}
                    delay={0.5}
                  />
                </div>
                <div>
                  <h3 className='font-semibold text-2xl sm:text-3xl text-[#E58C06] mb-3 sm:mb-5'>
                    How we keep your payment safe and easy
                  </h3>
                  <p className='text-xl sm:text-2xl mb-7 sm:mb-10'>
                    Your payment is securely held by Olójà Hub until the job is
                    completed to your satisfaction. Once approved, we transfer
                    it directly to the expert's verified bank account.
                  </p>
                  <Link
                    to='/'
                    className='border-[0.5px] border-[#381F8C] text-[#381F8C] bg-[#EBE9F4] font-bold px-5 py-3 rounded-full'
                  >
                    Post a task in 90 secs
                  </Link>
                </div>
              </li>
            </ul>
            <p className='font-bold px-5 sm:px-10 text-base sm:text-2xl text-center pt-6 pb-24 sm:pb-32'>
              Get your job done with peace of mind,{' '}
              <br className='block sm:hidden' /> knowing Olójà{' '}
              <br className='hidden sm:block' /> Hub has your back!
            </p>
          </div>
          <Wave position='bottom' />
        </section>

        <section className='w-[93%] sm:w-[85%] mx-auto text-center'>
          <p className='text-[#E58C06] mb-7 font-bold text-base sm:text-xl'>
            Ready to monetize your skills?
          </p>
          <h3 className='font-semibold text-2xl sm:text-3xl text-primary mb-3'>
            Oloja Hub makes it easy to find customers and
            <br className='hidden sm:block' /> earn money doing what you love
          </h3>
          <p className='font-bold text-base sm:text-2xl text-[#4D4B51] mb-10'>
            All while keeping things simple, secure, and flexible. Browse
            through jobs that <br className='hiddem sm:block' /> match your
            skills at no cost.
          </p>
          <ul className='grid gap-8 md:gap-3 grid-cols-1 md:grid-cols-3 mb-8'>
            {perks.map(perk => (
              <li
                className='text-primary overflow-clip shadow-xl bg-[#E1DDEE] text-xl rounded-3xl px-6 py-10 flex flex-col gap-4 justify-center relative '
                key={Math.random() * 1234}
              >
                <h4 className='font-bold'>{perk.title}</h4>
                <p className='font-medium'>{perk.text}</p>
                <div className='absolute bg-[#EF8C08] rounded-full w-20 h-20 bottom-0 right-0 translate-x-[40%] translate-y-[40%]' />
              </li>
            ))}
          </ul>
          <p className='font-medium text-xl sm:text-2xl text-primary mb-1'>
            With Oloja Hub, you focus on what you do best, and we’ll handle the
            rest.
          </p>
          <p className='underline text-xl sm:text-2xl text-[#E58C06] mb-10'>
            Start earning with ease today!
          </p>
          <div className='w-max space-x-1 sm:space-x-4 mx-auto'>
            <Link
              to='/'
              className='bg-[#381F8C] text-[#EBE9F4] font-bold px-5 py-3 rounded-full'
            >
              Get started now
            </Link>
            <Link
              to='/'
              className='border-[0.5px] border-[#381F8C] text-[#381F8C] font-bold px-5 py-3 rounded-full'
            >
              Monetize your skills
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HowOlojaWorks;
