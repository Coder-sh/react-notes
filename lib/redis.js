import Redis from 'ioredis';
const redis = new Redis();

const initialData = {
  1702459181837:
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459182837:
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459188837:
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

export const getAllNotes = async () => {
  const data = await redis.hgetall('notes');
  if (Object.keys(data).length === 0) {
    redis.hset('notes', initialData);
  }
  console.log(data);
  return await redis.hgetall('notes');
};

export const addNote = async (data) => {
  const uuid = Date.now().toString();
  await redis.hset('notes', [uuid], data);
  return uuid;
};

export const updateNote = async (uuid, data) => {
  await redis.hset('notes', [uuid], data);
};

export const getNote = async (uuid) => {
  return JSON.parse(await redis.hget('notes', uuid));
};

export const delNote = async (uuid) => {
  return await redis.hdel('notes', uuid);
};

export default redis;
