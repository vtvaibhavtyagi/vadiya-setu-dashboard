import { Web3Storage, getFilesFromPath } from 'web3.storage'

const Web3StorageApiPut = async (path) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDljQTBmZGNiMTlBQzI5YjZDQWI0MzI1NzQ1ZGI3NjVjZTJEYjVDRTMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA2NzI1NDY0MDYsIm5hbWUiOiJ2YWlkeWFfc2V0dSJ9.0MKENIevz2WDIH-gHk8UoGEpEWA0UKTSZ3NWWsmNqDI"

    const storage = new Web3Storage({ token })
    const files = []
   // const pathFiles = await getFilesFromPath(path)
   // files.push(...pathFiles)
    const cid = await storage.put(path)
    return cid;
}

const Web3StorageApiGet = async (cid) => {
    const data = await storage.get(cid)
    const files = await data.files()
    const utf8Files = []
    for (const file of files) {
        console.log(`${file.cid} ${file.name} ${file.size}`)
        const blobArr = await file.arrayBuffer()
        const data = new Uint8Array(blobArr);
        utf8Files.push(data)
    }
    return utf8Files;
}


export { Web3StorageApiGet, Web3StorageApiPut }

