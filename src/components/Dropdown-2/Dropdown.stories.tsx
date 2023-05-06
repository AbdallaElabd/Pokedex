import { Text } from '@components/Text';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import { Dropdown } from './Dropdown';

export default {
  component: Dropdown,
};

export function Default() {
  const [selected, setSelected] = useState('1');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Dropdown
        selected={selected}
        // eslint-disable-next-line react/no-unstable-nested-components
        toggler={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {`Dropdown (${selected})`}
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        }
        options={['1', '2', '3']}
        renderOption={(option) => <Text variant="body2">{option}</Text>}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onOptionClicked={setSelected}
      />
    </div>
  );
}
