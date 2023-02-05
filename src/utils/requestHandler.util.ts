import { HttpException, HttpStatus } from "@nestjs/common";
import { validate } from "uuid";


const validateUUID = (id: string): void => {
    if(!validate(id.trim())) {
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
};

export const checkCredentials = (login: string, password: string): void => {
    if(!login || !password) {
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
};

export const comparePassword = (userPassword: string, password: string): void => {
    if(userPassword !== password) {
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
};


export const findRecord = (db: any[], id: string): number => {
    validateUUID(id);
    const index = db.findIndex((entry) => {
        return entry.id === id;
    });
    if(index === -1) {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    }
    return index;
};


export const updateRecord = (db: any[], id: string, data: any): any => {
    const idx = findRecord(db, id);
    if(db[idx].password) {
        db[idx].password = data.newPassword;
        db[idx].updatedAt = Date.now();
        db[idx].version++;
    } else {
        db[idx] = data;
    }
    return db[idx];
} 


export const removeRecord = (db: any[], id: string): void => {
    const idx = findRecord(db, id);
    db.splice(idx, 1);
};