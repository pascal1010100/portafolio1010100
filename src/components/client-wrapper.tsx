"use client";

import { ReactNode } from 'react';

type ClientWrapperProps = {
  children: ReactNode;
};

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return <>{children}</>;
}
