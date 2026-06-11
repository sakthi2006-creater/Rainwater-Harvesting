
import { Logo } from '@/components/layout/logo';

export function LoadingAnimation() {
  return (
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 flex items-center justify-center pulse-animation">
        <Logo className="h-full w-full text-primary/30" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-full overflow-hidden" style={{ clipPath: 'url(#logo-clip)' }}>
            <Logo className="h-full w-full text-primary fill-up-animation" />
        </div>
        <Logo className="h-full w-full text-transparent" style={{ stroke: 'hsl(var(--primary))', strokeWidth: '2' }} />
      </div>

       <svg width="0" height="0">
        <defs>
          <clipPath id="logo-clip">
             <path d="M50 10 C50 10 20 50 20 75 C20 95 33 110 50 110 C67 110 80 95 80 75 C80 50 50 10 50 10 Z" transform="translate(0, -5)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
