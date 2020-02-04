import * as functions from 'firebase-functions';
import * as algoliasearch from 'algoliasearch';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('JobPosts');

// レコードを分割して追加する処理
const addRecords = (item: any) => {
  const records = item.body
    .match(/[\s\S]{1,500}/gm)
    .map((body: any, i: number) => {
      return {
        ...item,
        objectID: item.id + '-' + i,
        body
      };
    });
  return Promise.all(records.map((record: any) => index.addObject(record)));
};

// レコード追加する処理
export const addIndex = (data: any) => {
  const item = data;
  item.objectID = data.id;
  item.createdAt = item.createdAt.toMillis();

  if (item.body && item.body.length > 500) {
    return addRecords(item);
  } else {
    return index.addObject(item);
  }
};

// 削除
export const removeIndex = (id: string) => {
  return index.deleteBy({ filters: `id:${id}` });
};

// 更新
export const updateIndex = async (data: any) => {
  const item = data;
  item.objectID = data.id;
  item.updatedAt = item.updatedAt.toMillis();
  item.createdAt = item.createdAt.toMillis();
  await removeIndex(item.id);
  if (item.body && item.body.length > 500) {
    return addRecords(item);
  } else {
    return index.addObject(item);
  }
};
