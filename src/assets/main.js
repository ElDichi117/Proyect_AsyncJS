const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC36xmz34q02JYaZYKrMwXng&part=snippet%2Cid&order=date&maxResults=10';

const content = document.querySelector('#content');

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "dd7d748475mshee9d1367b31b838p120e31jsn9fd7a7d72615", //Esta key nunca debería de ser mostrada
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();

  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);//Esperamos el regreso de la información 
    let view = `
    ${videos.items.map(video => `
        <div class="group relative">
            <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>`).slice(0,8).join('')}
    `;/* Slice hace que mostremos solo los video indicados, Join es para unir cada uno de estos elementos html que se van creando */
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})()/* Estos parentesis hacen que se auto invoque la función */;


/* 
En este desafío debes crear una función que usando fetch haga llamadas a una API y esta función debe contar las siguientes características:

Realiza la transformación de datos a JSON
Solo permite hacer peticiones tipo GET
Recibir como parámetro de entrada un string que será la URL
Validar que una URL sea correcta, si no lo es debe lanzar un error con el mensaje Invalid URL
Si la URL tiene el formato correcto, pero no existe, debería lanzar un error con el mensaje Something was wrong


export async function runCode(url) {
  // Tu código aquí 👈

  const options = {
    method : "GET"
  };

  var urlApi;
  try {
    urlApi = new URL(url);//Validamos el formato de la url
  } catch (error) {
    throw new Error('Invalid URL');
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error('Something was wrong');

  }
}

runCode('https://api.escuelajs.co/api/v1/categories'); */