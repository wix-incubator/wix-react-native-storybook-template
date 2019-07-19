interface Params {
    kind: string;
    story: string;
}
export declare const navigate: (params: Params) => void;
export declare const linkTo: (kind: string, story?: string) => (...args: string[]) => void;
export declare const hrefTo: (kind: string, name: string) => Promise<string>;
export declare const withLinks: (storyFn: () => void) => void;
export {};
