import React, { useEffect } from 'react';
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const isPresent = localStorage.getItem("userData");
    if (!isPresent) {
      router.push("/login");
    } else {
      router.push("/webBuilder");
    }
  }, [router]);

  return (
    <div>
      {/* Content for your index page */}
    </div>
  );
}
