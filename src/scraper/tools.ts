import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import Generator from '../utils/generator.js';
global.creator = '@abotscraper – ahmuq'


export default class Tools {

    removeBackground = (image: string) => {
        return new Promise((resolve, reject) => {
            const headers = {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,ar;q=0.8,id;q=0.7,vi;q=0.6",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Microsoft Edge\";v=\"138\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "referrer": "https://aibackgroundremover.org/",
            }

            const payload = {
                image
            }
            axios.post("https://aibackgroundremover.org/api/remove-bg", payload, {
                headers: headers
            }).then((CreateJobResponse: AxiosResponse) => {
                if (CreateJobResponse.status !== 200) {
                    reject({
                        creator: global.creator,
                        status: false,
                        error: `job creation failed`,
                    });
                    return;
                }
                const jobId = CreateJobResponse.data.id;
                const checkJobStatus = () => {
                    axios.get(`https://aibackgroundremover.org/api/check-status?id=${jobId}`, {
                        headers: headers
                    }).then((jobResponse: AxiosResponse) => {
                        console.log('✅ jobResponse:', jobResponse.data);
                        if (jobResponse.data.status === "succeeded") {
                            resolve({
                                creator: global.creator,
                                status: true,
                                result: {
                                    job_id: jobId,
                                    image_url: jobResponse.data.output
                                }
                            });
                        } else if (jobResponse.data.status === "starting") {
                            setTimeout(checkJobStatus, 3000);
                        } else {
                            reject({
                                creator: global.creator,
                                status: false,
                                error: `job status unknown: ${jobResponse.data.status}`,
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
        })
    }

    reminiUpscale = (buffer: Buffer) => {
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