import fs from 'fs';
import path from 'path';

const storePath = path.join(process.cwd(), '.store.json');

export const documentStore = {
  get: (id: string) => {
    try {
      if (fs.existsSync(storePath)) {
        const data = JSON.parse(fs.readFileSync(storePath, 'utf8'));
        return data[id];
      }
    } catch (e) {
      console.error(e);
    }
    return undefined;
  },
  set: (id: string, doc: { title: string, markdown: string }) => {
    try {
      let data: any = {};
      if (fs.existsSync(storePath)) {
        data = JSON.parse(fs.readFileSync(storePath, 'utf8'));
      }
      data[id] = doc;
      fs.writeFileSync(storePath, JSON.stringify(data));
    } catch (e) {
      console.error(e);
      throw new Error('Could not save this document on the server. The document store may be read-only.');
    }
  }
};
