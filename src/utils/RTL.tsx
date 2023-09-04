import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

interface RTLProps {
  children: React.ReactNode;
}
function RTL({ children }: RTLProps) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}

export default RTL;
