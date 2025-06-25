import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';

global.creator = '@abotscraper – ahmuq'

export default class Tools {
    uploadImage = (buffer: Buffer) => {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('fileToUpload', buffer, 'image.jpg');
            form.append('reqtype', 'fileupload');
            form.append('userhash', '');

            axios.post('https://catbox.moe/user/api.php', form, {
                headers: {
                    ...form.getHeaders(),
                }
            })
                .then((response: AxiosResponse) => {
                    resolve({
                        creator: global.creator,
                        status: true,
                        result: response.data
                    })
                })
                .catch((error) => {
                    reject({
                        creator: global.creator,
                        status: false,
                        error: error.message,
                    });
                });
        })
    }
}