import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";

/*
import { initializeI18n } from "~/i18n/client";
import { LanguageWrapper } from "~/i18n/LanguageWrapper";
*/
async function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,

      <StrictMode>
        <HydratedRouter />
      </StrictMode>,
    );
  });
}

hydrate().catch((error) => console.error(error));
