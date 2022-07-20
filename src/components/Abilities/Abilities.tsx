import { Pokemon } from "@api/cache";
import { Chip } from "@components/Chip";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "@styles/theme";
import { capitalize } from "@utils";
import Highlighter from "react-highlight-words";
import styled from "styled-components";

import { HighlightedText } from "../HighlightedText";

const Container = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
`;

const AbilityIcon = styled(FontAwesomeIcon).attrs({
  icon: faBoltLightning,
})`
  margin-right: ${theme.spacing[2]};
`;

interface AbilitiesProps {
  abilities: Pokemon["abilities"];
  highlightText?: string;
}

export function Abilities({ abilities, highlightText }: AbilitiesProps) {
  if (!abilities.length) return null;

  return (
    <Container>
      {abilities.map(({ ability }) => (
        <Chip key={ability.name}>
          <AbilityIcon />
          {highlightText ? (
            <Highlighter
              highlightTag={HighlightedText}
              searchWords={[highlightText]}
              textToHighlight={capitalize(ability.name)}
            />
          ) : (
            capitalize(ability.name)
          )}
        </Chip>
      ))}
    </Container>
  );
}
