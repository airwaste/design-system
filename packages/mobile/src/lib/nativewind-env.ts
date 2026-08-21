// Augments react-native prop interfaces with `className` so this package
// compiles with plain tsc (no nativewind dependency) while consumer apps with
// NativeWind resolve the classes at build time. Loaded via index.ts so the
// augmentation applies wherever the package's types are imported.
import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface SwitchProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
}
