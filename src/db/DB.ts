
export default class DB {
    
    db: any = [];

    findAll(): any[] {
        return this.db;
    }

    findOne(db: any[], id: string): number {
        const index = db.findIndex((entry) => {
            return entry.id === id;
        });
        return index;
    };

    update(db: any[], id: string, data: any): any {
        const idx = this.findOne(db, id);
        db[idx] = data;
        return db[idx];
    };

    remove(db: any[], id: string): void {
        const idx = this.findOne(db, id);
        db.splice(idx, 1);
    };
}