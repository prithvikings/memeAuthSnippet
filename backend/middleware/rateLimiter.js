import { redisClient } from "../config/redis.js";

const RATE_LIMIT_WINDOW = 60; // in seconds
const MAX_REQUESTS = 10; 


// Fixed Window Rate Limiting Implementation
const rateLimiter=async(req,res,next)=>{
  try{
    const ip=req.ip;
    const requests=await redisClient.incr(ip);
    if(requests>MAX_REQUESTS){
      return res.status(429).json({message:"Too Many Requests"});
    }

    if(requests===1){
      await redisClient.expire(RATE_LIMIT_WINDOW);
    }
    next();
  }catch(err){
    console.error("Rate Limiter Error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// slide window rate limiting implementation
// const rateLimiter = async (req, res, next) => {
//   try {
//     const ip = req.ip;
//     const currentTime = Math.floor(Date.now() / 1000);
//     const windowStart = currentTime - RATE_LIMIT_WINDOW;

//     await client.zremrangebyscore(ip, 0, windowStart);

//     const requestCount = await client.zcard(ip);
//     if (requestCount >= MAX_REQUESTS) {
//       return res.status(429).json({ message: "Too Many Requests" });
//     }
    
//     await client.zadd(ip, currentTime, currentTime);
//     await client.expire(ip, RATE_LIMIT_WINDOW);
//     next();


//   } catch (err) {
//     console.error("Rate Limiter Error", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export default rateLimiter;
