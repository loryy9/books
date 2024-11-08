const BASE_URL = 'http://localhost:8000';

export const bookAdd = async (id: number, title: string, author: string) => {
	const req = await fetch(BASE_URL + '/books/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id, title, author })
	});

	const res = await req.json();
	return res;
};

export const bookList = async () => {
    const req = await fetch(BASE_URL + "/books/list");
    const res = await req.json();

    return res
}

export const bookDel = async ( id: number ) => {
    const req = await fetch( BASE_URL + "/books/del/" + id, {
        method: 'DELETE',
    });

    const res = await req.json();

    return res;
}
