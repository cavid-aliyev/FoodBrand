//Function for posting datas
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

   async function getResource (url){
        let res = await fetch(url);

        //Fetch cant catch http server errors(404,500) and for solving this problem we use ok and status methods.
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        } else {
            //Conver to normal js object
            return await res.json();
        }
}

export {postData};
export {getResource};