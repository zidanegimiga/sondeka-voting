/// <reference types="next" />
/// <reference types="next/types/global" />
declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}