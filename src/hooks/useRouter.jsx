import { parseSearch } from "@/utils/url";
import { useLocation, globalHistory, navigate } from "@reach/router";
import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { DEFAULT_LOCALE } from "../config/locales";

export const useRouter = () => {
  const { pathname, search, ...rest } = useLocation();
  const [locale] = useLocalStorage("locale", DEFAULT_LOCALE);

  const query = useMemo(() => parseSearch(search), [search]);

  /**
   * @typedef {Object} Events
   * @property {(event: import('@reach/router').HistoryActionType, callback: (location: import('@reach/router').HistoryLocation) => void) => void} on - Adds an event listener.
   * @property {function} off - Removes the event listener.
   */

  /** @type {Events} */
  const events = useMemo(() => {
    let listener = null;

    return {
      on: (event, callback) => {
        listener = globalHistory.listen(({ action, location }) => {
          if (action === event) {
            callback(location);
          }
        });
      },
      off: () => {
        listener();
      },
    };
  }, []);

  const back = () => globalHistory.navigate(-1);

  return {
    ...rest,
    pathname,
    query,
    push: navigate,
    replace: (path) => navigate(path, { replace: true }),
    locale,
    defaultLocale: DEFAULT_LOCALE,
    events,
    back,
  };
};
