/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

// Custom path aliases
declare module '@/*' {
  const value: any;
  export default value;
}

declare module '@/components/*' {
  const value: any;
  export default value;
}

declare module '@/app/*' {
  const value: any;
  export default value;
}

declare module '@/lib/*' {
  const value: any;
  export default value;
}

declare module '@/styles/*' {
  const value: any;
  export default value;
}

declare module '@/public/*' {
  const value: any;
  export default value;
}

declare module '@/hooks/*' {
  const value: any;
  export default value;
}
