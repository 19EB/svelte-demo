class Fetcher {

    static async Get<T = any>(url:string) {
        const result = await fetch(url);
        const response:T = await result.json();
        return {
            data: response
        }
    }   

}

export default Fetcher;

