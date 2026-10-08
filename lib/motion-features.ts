import { domMax } from "framer-motion";

/* Framer's animation + gesture + layout features, split out of the
   main bundle. <LazyMotion> in components/Providers.tsx imports this
   chunk after hydration; until it lands, `m` components render their
   initial state (so no CSS-driven first paint depends on it).
   domMax rather than domAnimation because the navbar's active pill
   uses a shared layoutId. */

export default domMax;
