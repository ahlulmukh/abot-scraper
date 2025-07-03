import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import Generator from '../utils/generator.js';
global.creator = '@abotscraper – ahmuq'


export default class Tools {

    removeBackground = (image: Buffer) => {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('image_file', image, 'blob');
            const productSerial = Generator.getFingerprint();
            axios.post('https://api.ezremove.ai/api/ez-remove/background-remove/create-job', form, {
                headers: {
                    ...form.getHeaders(),
                    'product-serial': productSerial,
                    'Referer': 'https://ezremove.ai/',
                    'Origin': 'https://ezremove.ai',
                    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0'
                }
            }).then((createJobResponse: AxiosResponse) => {
                if (createJobResponse.data.code !== 100000) {
                    reject({
                        creator: global.creator,
                        status: false,
                        error: `Job creation failed: ${createJobResponse.data.message?.en || createJobResponse.data.message?.id || 'Unknown error'}`,
                    });
                    return;
                }
                const jobId = createJobResponse.data.result.job_id;

                const checkJobStatus = async () => {
                    try {
                        const jobResponse = await axios.get(`https://api.ezremove.ai/api/ez-remove/background-remove/get-job/${jobId}`, {
                            headers: {
                                'authorization': '',
                                'product-serial': productSerial,
                                'Referer': 'https://ezremove.ai/',
                                'Origin': 'https://ezremove.ai',
                            }
                        });
                        const { code, result, message } = jobResponse.data;
                        if (code === 100000 && result && result.output) {
                            resolve({
                                creator: global.creator,
                                status: true,
                                result: {
                                    job_id: jobId,
                                    image_url: result.output[0]
                                }
                            });
                        } else if (code === 300001) {
                            setTimeout(checkJobStatus, 3000);
                        } else {
                            reject({
                                creator: global.creator,
                                status: false,
                                error: `Job failed: ${message?.en || message?.id || 'Unknown error'} (Code: ${code})`,
                            });
                        }
                    } catch (error: unknown) {
                        reject({
                            creator: global.creator,
                            status: false,
                            error: `Status check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                        });
                    }
                };

                checkJobStatus();
            }).catch((error) => {
                reject({
                    creator: global.creator,
                    status: false,
                    error: error.message,
                });
            });
        })
    }

    reminiV2 = (buffer: Buffer) => {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('image', buffer, 'blob');
            form.append('scale', 2);
            axios.post('https://api2.pixelcut.app/image/upscale/v1', form, {
                headers: {
                    ...form.getHeaders(),
                    Accept: 'application/json',
                    Referer: 'https://www.pixelcut.ai/',
                    Origin: 'https://www.pixelcut.ai',
                    'x-client-version': 'web'
                }
            }).then((Response: AxiosResponse) => {
                if (Response.data.result_url) {
                    resolve({
                        creator: global.creator,
                        status: true,
                        result: Response.data.result_url
                    })
                }
            }).catch((error) => {
                reject({
                    creator: global.creator,
                    status: false,
                    error: error.message,
                });
            })
        })
    }

    reminiV1 = (buffer: Buffer) => {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('type', 'Enhancer');
            form.append('original_image_file', buffer, 'blob');
            const productSerial = Generator.getFingerprint();
            axios.post('https://api.remaker.ai/api/pai/v4/ai-enhance/create-job-new', form, {
                headers: {
                    ...form.getHeaders(),
                    'authorization': '',
                    'product-code': '067003',
                    'product-serial': productSerial,
                    'Referer': 'https://remaker.ai/',
                    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0'
                }
            }).then((createJobResponse: AxiosResponse) => {
                if (createJobResponse.data.code !== 100000) {
                    reject({
                        creator: global.creator,
                        status: false,
                        error: `Job creation failed: ${createJobResponse.data.message.en}`,
                    });
                    return;
                }
                const jobId = createJobResponse.data.result.job_id;
                const checkJobStatus = () => {
                    axios.get(`https://api.remaker.ai/api/pai/v4/ai-enhance/get-job/${jobId}`, {
                        headers: {
                            'authorization': '',
                            'product-code': '067003',
                            'product-serial': productSerial,
                            'Referer': 'https://remaker.ai/',
                        }
                    }).then((jobResponse: AxiosResponse) => {
                        if (jobResponse.data.code === 100000) {
                            resolve({
                                creator: global.creator,
                                status: true,
                                result: {
                                    job_id: jobId,
                                    image_url: jobResponse.data.result.output[0]
                                }
                            });
                        } else if (jobResponse.data.code === 300013) {
                            setTimeout(checkJobStatus, 3000);
                        } else {
                            reject({
                                creator: global.creator,
                                status: false,
                                error: `Job failed: ${jobResponse.data.message.en}`,
                            });
                        }
                    }).catch((error) => {
                        reject({
                            creator: global.creator,
                            status: false,
                            error: error.message,
                        });
                    });
                };

                checkJobStatus();
            }).catch((error) => {
                reject({
                    creator: global.creator,
                    status: false,
                    error: error.message,
                });
            });
        });
    }

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