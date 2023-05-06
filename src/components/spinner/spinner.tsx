import classNames from 'classnames';

import pokeball from './pokeball.png';

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className="column flex flex-col items-center gap-8 p-24">
      <img
        className={classNames('h-36 w-36 animate-bounce', className)}
        src={pokeball}
        alt="Loading"
      />
      <span className="animate-fade font-mono text-2xl">
        Loading Pokédex...
      </span>
    </div>
  );
}
