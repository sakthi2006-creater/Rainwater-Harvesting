import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rain2ground Report',
};

export default function ReportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white text-black">
      {children}
    </div>
  );
}
