/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_STALE_TIME: string;
  readonly VITE_REACT_APP_CACHE_TIME: string;
  readonly VITE_REACT_APP_MAX_RETRIES: string;
  readonly VITE_REACT_APP_MAX_RETRY_DELAY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
