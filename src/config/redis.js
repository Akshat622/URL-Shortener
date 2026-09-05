import redis from "ioredis"

const redis = new redis(process.env.REDIS_URL||"redis://127.0.0.1:6379")

redis.on("connect",()=>{
    console.log("Redis connected")
})

redis.on("error",(err)=>{
    console.error(`Redis error :${err.message}`)
})

export default redis