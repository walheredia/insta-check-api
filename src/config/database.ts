import { connect } from 'mongoose';

export async function startConnection() {
    await connect('mongodb+srv://harRoot:insta2021@cluster0.tqyao.mongodb.net/instacheck', {
    });
    console.log('Connected to database!')
}