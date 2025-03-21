"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const getLocalizedGreeting = (): string => {
  const localHour = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(new Date());

  const hour = parseInt(localHour, 10);

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

function Heading() {
  const { data } = useSession();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getLocalizedGreeting());

    const interval = setInterval(() => {
      setGreeting(getLocalizedGreeting());
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-5">
      <h2 className="mb-1 font-satoshiBold text-3xl font-bold text-primary sm:text-2xl sm:font-semibold">
        Hi {data?.user.user.firstName}
        <span className="hidden sm:inline">, {greeting}!</span>
      </h2>
      <p className="block font-medium text-[#55535A] sm:hidden">{greeting}!</p>
    </div>
  );
}

export default Heading;
