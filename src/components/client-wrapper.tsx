"use client";

import { ReactNode, useEffect, useState } from 'react';

type ClientWrapperProps = {
  children: ReactNode;
};

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering on the server
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
