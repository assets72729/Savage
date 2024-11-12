interface ProcessObject {
    id: number;
    isInProcess: boolean;
}
declare class Memory {
    private objects;
    constructor();
    startProcess(id: number): boolean;
    removeObject(id: number): void;
    completeProcess(id: number): void;
    isObjectInProcess(id: number): boolean;
    getObjects(): ProcessObject[];
}
declare const memory: Memory;
export default memory;
