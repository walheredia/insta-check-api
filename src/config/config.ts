export const JWT_SECRET = process.env["JWT_SECRET"];

if(!JWT_SECRET){
    console.log("NO JWT present");
    process.exit(1);
}

