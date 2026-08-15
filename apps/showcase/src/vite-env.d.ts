/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXPO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
