import { Pokemon } from '@api/cache';
import { Chip } from '@components/Chip';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalize } from '@utils';
import Highlighter from 'react-highlight-words';

interface AbilitiesProps {
  abilities: Pokemon['abilities'];
  highlightText?: string;
}

export function Abilities({ abilities, highlightText }: AbilitiesProps) {
  if (!abilities.length) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {abilities.map(({ ability }) => (
        <Chip key={ability.name} className="flex gap-1 text-sm font-semibold">
          <FontAwesomeIcon icon={faBoltLightning} />
          {highlightText ? (
            <Highlighter
              highlightClassName="bg-yellow-300"
              searchWords={[highlightText]}
              textToHighlight={capitalize(ability.name)}
            />
          ) : (
            capitalize(ability.name)
          )}
        </Chip>
      ))}
    </div>
  );
}
