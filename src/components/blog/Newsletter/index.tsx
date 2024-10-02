import Button from '@/components/global/Button'
import React, { useState } from 'react'

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('https://api.oloja.com.au/api/v1/util/blog/subscribe-to-newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('Successfully subscribed to the newsletter!');
                setEmail('');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            <h2 className="font-clashBold text-3xl font-extrabold text-violet-normal">
                Newsletter
            </h2>
            <p className="font-satoshiMedium text-sm">Join our newsletter for an exclusive pass to the latest– breaking news, in-depth analyses, and insider perspectives delivered straight to your inbox.</p>
            <form className="w-full px-2 py-4" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-2 py-4 rounded-full border border-[#C6C6C6] bg-[#EEEEEF] appearance-none outline-none placeholder:text-[#C1BADB] placeholder:font-bold"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    className='w-full bg-[#E58C06] mt-3 rounded-full border-none font-satoshiMedium'
                    disabled={isLoading}
                >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
            </form>
            {message && (
                <p className={`text-center ${message.includes('Successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
        </div>
    )
}

export default Newsletter