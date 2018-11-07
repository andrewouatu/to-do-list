export function randomString(length){
    const values = 'abcdefghijklmnopqrstuvwxyz';

    let randomString = '';

    for(let t = 0; t < length; t++){
        const randomIndex = Math.floor(Math.random() * values.length);

        randomString += values[randomIndex];
    }
    return randomString;
}