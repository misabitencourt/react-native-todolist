import AsyncStorage from '@react-native-async-storage/async-storage';


export type LocalStorageListOp = {
    listAll(): Promise<any[]>;
    findById(id: number, items: any[] | null): Promise<any>;
    create(item: any): Promise<any>;
    update(item: any): Promise<void>;
    destroy(id: number): Promise<void>;
};

export const localStorageList = (namespace: string) => {

    function getNextId(items: any[]) {
        return items.reduce((acc, current) => {
            if (acc <= current.id) {
                return current.id;
            }
            return acc;
        }, 1) + 1;
    }

    const instance: LocalStorageListOp = {

        async listAll() {
            const list = await AsyncStorage.getItem(namespace);

            return JSON.parse(list || '[]');
        },

        async findById(id: number, list: any[] | null= null) {
            return (
                list || (await this.listAll())
            ).find((listItem: any) => listItem.id === id);
        },

        async create(item: any) {
            const list = await this.listAll();
            item.id = getNextId(list);
            list.push(item);
            await AsyncStorage.setItem(namespace, JSON.stringify(list));

            return item;
        },

        async update(item: any) {
            const list = await this.listAll();
            const id = item.id;
            const saved = await this.findById(id, list);
            if (!saved) {
                throw new Error(`Item #${id} not found!`);
            }
            list[list.indexOf(saved)] = {...saved, ...item, id };
            await AsyncStorage.setItem(namespace, JSON.stringify(list));
        },

        async destroy(id: number) {
            const list = await this.listAll();
            const savedOne = await this.findById(id, list);
            if (!savedOne) {
                throw new Error(`Item #${id} not found!`);
            }
            list.splice(list.indexOf(savedOne), 1);
            await AsyncStorage.setItem(namespace, JSON.stringify(list));
        }
    };

    return instance;
};