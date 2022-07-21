import styled from "styled-components";

import { LazyImage } from "./LazyImage";

export default {
  component: LazyImage,
};

const StyledLazyImage = styled(LazyImage)`
  height: 10rem;
  width: 10rem;
`;

export function Default() {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
      <StyledLazyImage image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" />
    </div>
  );
}
