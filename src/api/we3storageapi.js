import { Web3Storage, getFilesFromPath } from "web3.storage";

const Web3StorageApiPut = async (path) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDljQTBmZGNiMTlBQzI5YjZDQWI0MzI1NzQ1ZGI3NjVjZTJEYjVDRTMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA2NzI1NDY0MDYsIm5hbWUiOiJ2YWlkeWFfc2V0dSJ9.0MKENIevz2WDIH-gHk8UoGEpEWA0UKTSZ3NWWsmNqDI";

  const storage = new Web3Storage({ token });
  const files = [];
  // const pathFiles = await getFilesFromPath(path)
  // files.push(...pathFiles)
  const cid = await storage.put(path);
  return cid;
};

export { Web3StorageApiPut };
