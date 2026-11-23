import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rate My Chances — AI Career Intelligence & Hiring Probability',
  description: 'Predict your likelihood of getting hired at Google, Microsoft, and top tech companies with data-backed skill gap analysis and personalized roadmaps.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
