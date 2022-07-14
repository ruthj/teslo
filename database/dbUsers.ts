import { db } from "."
import { User } from "../models";
import bcrypt from 'bcryptjs';
import { disconnect } from './db';



export const checkUserEmailPassword = async (email:string, password: string) => {


    await db.connect();

    const user = await User.findOne({email});
    await db.disconnect();

    if(!user){
        return null
    }

    if(!bcrypt.compareSync(password, user.password)){ //sino hace match
        return null;
    }

    const { role, name, _id } = user;

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
    }


}

//Crea o verifica el usuario de oauth

export const oAuthToDbUser = async (oAuthEmail:string, oAuthName:string) => {

    await db.connect();

    const user = await User.findOne({email:oAuthEmail});

    if(user) {
        await db.disconnect();
        const { _id, name, email, role } = user;

        return{_id, name, email, role};
    }

    const newUser = new User({email:oAuthEmail, name: oAuthName, password:'@', role:'client'});
    await newUser.save();
    await db.disconnect();

    const { _id, name, email, role } = newUser;

    return { _id, name, email, role };


}















