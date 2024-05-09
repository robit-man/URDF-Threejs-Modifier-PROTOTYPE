import { LoadingManager, Object3D } from 'three';
import { URDFRobot } from './URDFClasses';

interface MeshLoadDoneFunc {
    (mesh: Object3D): void;
}

interface MeshLoadFunc{
    (url: string, manager: LoadingManager, onLoad: MeshLoadDoneFunc): void;
}

interface URDFLoaderOptions {

    packages?: string | { [key: string]: string },
    loadMeshCb?: MeshLoadFunc,
    workingPath?: string,
    fetchOptions?: object

}

export default class URDFLoader {

    manager: LoadingManager;
    public defaultMeshLoader(url: string, manager: LoadingManager, onLoad: MeshLoadDoneFunc): void;

    constructor(manager?: LoadingManager);
    public load(
        url: string,
        onLoad: (robot: URDFRobot, errors?: { [url: string]: string }) => void,
        onProgress: (url: string, itemsLoaded: number, itemsTotal: number) => void,
        onError: (args: { url: string, retry: () => void }) => void,
        options?: URDFLoaderOptions
    ): void;
    public parse(content: string, options?: URDFLoaderOptions): URDFRobot;

}
