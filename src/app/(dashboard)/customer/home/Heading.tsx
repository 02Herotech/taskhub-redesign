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
    <h2 className="mb-5 text-2xl font-semibold text-primary">
      Hi {data?.user.user.firstName}, {greeting}!
    </h2>
  );
}

export default Heading;
