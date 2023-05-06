import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LazyImageProps {
  image: string | undefined;
  className?: string;
}

export function LazyImage({ image, className }: LazyImageProps) {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'succeeded' | 'failed'
  >(image ? 'pending' : 'idle');

  useEffect(() => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => setStatus('succeeded');
    img.onerror = () => setStatus('failed');
  }, [image]);

  return (
    <div
      className={classNames(
        'relative flex overflow-hidden transition-all duration-300 ease-in-out',
        className
      )}
    >
      <AnimatePresence>
        {status === 'pending' ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full animate-pulse rounded-md bg-slate-300"
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full bg-contain bg-center bg-no-repeat bg-origin-content"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
