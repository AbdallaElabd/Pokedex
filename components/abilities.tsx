import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Highlighter from "react-highlight-words";

import { buttonVariants } from "./button";
import { capitalize } from "@/utils/capitalize";
import { Pokemon } from "@/api/requests";
import Link from "next/link";

interface AbilitiesProps {
  abilities: Pokemon["abilities"];
  highlightText?: string;
}

export function Abilities({ abilities, highlightText }: AbilitiesProps) {
  if (!abilities.length) return null;

  return (
    <div className="flex flex-wrap gap-1 whitespace-nowrap">
      {abilities.map(({ ability }) => (
        <Link
          key={ability.name}
          href={{
            pathname: "/",
            search: `?searchBy=ability&searchText=${capitalize(ability.name)}`,
          }}
          className={classNames(
            buttonVariants({ variant: "primary", size: "xs" }),
            "gap-1 font-semibold"
          )}
        >
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
        </Link>
      ))}
    </div>
  );
}
